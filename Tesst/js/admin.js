// -- Menu chuyển tab section admin --
const menuItems = document.querySelectorAll('.sidebar-menu li');
const sections = document.querySelectorAll('.admin-section');


// Thêm sự kiện khi chọn file để xem trước ảnh
const imgInput = document.getElementById("product-image");
const imgPreview = document.getElementById("image-preview");

imgInput.onchange = function() {
    const file = imgInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imgPreview.src = e.target.result;
            imgPreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
};


menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(i => i.classList.remove('active'));
        sections.forEach(s => s.classList.add('hide'));

        // Ẩn tất cả form khi chuyển section

        hideForm(); 
        hideCustomerForm();


        const productForm = document.getElementById("product-form");
        const customerForm = document.getElementById("customer-form");
        if(productForm) productForm.classList.add("hide");
        if(customerForm) customerForm.classList.add("hide");
        // Hiển thị section tương ứng
        item.classList.add('active');
        const secId = 'section-' + item.id.replace('menu-', '');
        document.getElementById(secId).classList.remove('hide');
    });
});

// -- CRUD sản phẩm sử dụng localStorage --
const LS_KEY = 'crud_products';
function loadProducts() {
    try {
        const raw = localStorage.getItem(LS_KEY);
        if(raw) return JSON.parse(raw);
    } catch(e){}
    return [
        { id: "SP01", name: "Gạch ốp", image: "images/gach1.jpg", desc: "Gạch ốp lát", category: "gach", price: 50000, quantity: 100 }
    ];
}
function saveProducts(products) {
    localStorage.setItem(LS_KEY, JSON.stringify(products));
}
let products = loadProducts();

function renderProducts() {
    const tbody = document.getElementById("product-tbody");
    if(!tbody) return;
    tbody.innerHTML = "";
    products.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td><img src="${p.image}" alt="" style="width:60px"></td>
            <td>${p.desc}</td>
            <td><strong>${p.brand}</strong></td>
            <td>${categoryLabel(p.category)}</td>
            <td>${p.price.toLocaleString()}</td>
            <td>${p.quantity}</td>
            <td>
                <button class="edit-btn" data-id="${p.id}">Sửa</button>
                <button class="delete-btn" data-id="${p.id}">Xóa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
function categoryLabel(category) {
    const map = {
        "gach": "Gạch ốp lát",
        "guong": "Gương",
        "vat-lieu-mat-dung": "Vật liệu mặt dựng",
        "vat-lieu-op-tran": "Vật liệu ốp trần",
        "vat-lieu-op-tuong": "Vật liệu ốp tường",
        "noi-that": "Nội thất",
        "rem-cua": "Rèm Cửa",
        "san-go": "Sàn gỗ",
        "san-vinyl": "Sàn vinyl",
        "thiet-bi-gia-dung": "Thiết bị gia dụng",
        "thiet-bi-ve-sinh": "Thiết bị vệ sinh"
    };
    return map[category] || category;
}
renderProducts();

// CRUD form và sự kiện
if(document.getElementById("show-add-form"))
    document.getElementById("show-add-form").onclick = function() {
        showForm();
    };
if(document.getElementById("cancel-btn"))
    document.getElementById("cancel-btn").onclick = function() {
        hideForm();
    };

function showForm(product) {
    const form = document.getElementById("product-form");
    form.classList.remove("hide");
    
    if (product) {
        // Gán các giá trị text/number
        document.getElementById("product-id").value = product.id;
        document.getElementById("product-code").value = product.id;
        document.getElementById("product-code").disabled = true;
        document.getElementById("product-name").value = product.name;
        document.getElementById("product-desc").value = product.desc;
        document.getElementById("product-brand").value = product.brand || ""; // Sửa lỗi thương hiệu
        document.getElementById("product-category").value = product.category;
        document.getElementById("product-price").value = product.price;
        document.getElementById("product-quantity").value = product.quantity;

        // XỬ LÝ HÌNH ẢNH: 
        // Không gán product.image vào .value của input file (sẽ bị lỗi)
        document.getElementById("product-image").value = ""; 
        
        // Hiển thị ảnh cũ vào khung xem trước
        if (product.image) {
            imgPreview.src = product.image;
            imgPreview.style.display = "block";
        } else {
            imgPreview.style.display = "none";
        }

    } else {
        form.reset();
        imgPreview.style.display = "none";
        document.getElementById("product-code").disabled = false;
        document.getElementById("product-id").value = "";
    }
}



function hideForm() {
    document.getElementById("product-form").classList.add("hide");
    document.getElementById("product-form").reset();
    document.getElementById("product-code").disabled = false;
    document.getElementById("product-id").value = "";
}

if(document.getElementById("product-form"))
document.getElementById("product-form").onsubmit = function(e) {
    e.preventDefault();
    const id = document.getElementById("product-code").value.trim();
    const name = document.getElementById("product-name").value.trim();
    const image = document.getElementById("product-image").value.trim();
    const desc = document.getElementById("product-desc").value.trim();
    const brand = document.getElementById("product-brand").value;
    const category = document.getElementById("product-category").value;
    const price = parseInt(document.getElementById("product-price").value, 10);
    const quantity = parseInt(document.getElementById("product-quantity").value, 10);
    const editId = document.getElementById("product-id").value;

    const file = document.getElementById("product-image").files[0];
    const saveAction = (imageData) => {
        if (editId && editId === id) {
            const idx = products.findIndex(p => p.id === id);
            if (idx > -1) {
                // Nếu không chọn ảnh mới thì giữ nguyên ảnh cũ
                const finalImg = imageData || products[idx].image;
                products[idx] = { id, name, image: finalImg, desc, brand , category, price, quantity };
            }
        } else {
            if (!products.some(p => p.id === id)) {
                products.push({ id, name, image: imageData || "", desc, brand , category, price, quantity });
            } else {
                alert("Mã sản phẩm đã tồn tại!");
                return;
            }
        }
        saveProducts(products);
        hideForm();
        renderProducts();
        imgPreview.style.display = "none"; // Ẩn ảnh xem trước sau khi lưu
        };
        if (file) {
            const reader = new FileReader();
                 reader.onload = function(e)   {
                saveAction(e.target.result);
            };
            reader.readAsDataURL(file);
                } else {
                    saveAction(null);
                }
        
    };
    

if(document.getElementById("product-tbody"))
document.getElementById("product-tbody").onclick = function(e) {
    if (e.target.classList.contains("edit-btn")) {
        const id = e.target.dataset.id;
        const product = products.find(p => p.id === id);
        if (product) {
            showForm(product);
        }
        
    }
    if (e.target.classList.contains("delete-btn")) {
        const id = e.target.dataset.id;
        if (confirm("Bạn chắc chắn muốn xóa sản phẩm?")) {
            products = products.filter(p => p.id !== id);
            saveProducts(products);
            renderProducts();
        }
    }
};

// -- CRUD khách hàng sử dụng localStorage --
const LS_KEY_CUSTOMER = 'crud_customers';
function loadCustomers() {
    try {
        const raw = localStorage.getItem(LS_KEY_CUSTOMER);
        if(raw) return JSON.parse(raw);
    } catch(e){}
    return [
        { id: "KH01", name: "Nguyễn Văn A", address: "123 Đường ABC, Quận 1, TP.HCM", phone: "0123456789", email: "nguyenvana@example.com", username: "user01", password: "123456" }
    ];
}
function saveCustomers(customers) {
    localStorage.setItem(LS_KEY_CUSTOMER, JSON.stringify(customers));
}
let customers = loadCustomers();

function renderCustomers() {
    const tbody = document.getElementById("customer-tbody");
    if(!tbody) return;
    tbody.innerHTML = "";
    customers.forEach(c => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${c.id}</td>
            <td>${c.name}</td>
            <td>${c.address}</td>
            <td>${c.phone}</td>
            <td>${c.email}</td>
            <td>${c.username}</td>
            <td>******</td>
            <td>
                <button class="edit-btn" data-id="${c.id}">Sửa</button>
                <button class="delete-btn" data-id="${c.id}">Xóa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
renderCustomers();

// CRUD form khách hàng và sự kiện
if(document.getElementById("show-add-customer-form"))
    document.getElementById("show-add-customer-form").onclick = function() {
        showCustomerForm();
    };
if(document.getElementById("cancel-customer-btn"))
    document.getElementById("cancel-customer-btn").onclick = function() {
        hideCustomerForm();
    };

function showCustomerForm(customer) {
    const form = document.getElementById("customer-form");
    if(!form) return;
    form.classList.remove("hide");
    if (customer) {
        document.getElementById("customer-id").value = customer.id;
        document.getElementById("customer-code").value = customer.id;
        document.getElementById("customer-code").disabled = true;
        document.getElementById("customer-name").value = customer.name;
        document.getElementById("customer-address").value = customer.address;
        document.getElementById("customer-phone").value = customer.phone;
        document.getElementById("customer-email").value = customer.email;
        document.getElementById("customer-username").value = customer.username;
        document.getElementById("customer-password").value = customer.password;
    } else {
        form.reset();
        document.getElementById("customer-code").disabled = false;
        document.getElementById("customer-id").value = "";
    }
}
function hideCustomerForm() {
    const form = document.getElementById("customer-form");
    if(!form) return;
    form.classList.add("hide");
    form.reset();
    document.getElementById("customer-code").disabled = false;
    document.getElementById("customer-id").value = "";
}

if(document.getElementById("customer-form"))
document.getElementById("customer-form").onsubmit = function(e) {
    e.preventDefault();
    const id = document.getElementById("customer-code").value.trim();
    const name = document.getElementById("customer-name").value.trim();
    const address = document.getElementById("customer-address").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const email = document.getElementById("customer-email").value.trim();
    const username = document.getElementById("customer-username").value.trim();
    const password = document.getElementById("customer-password").value.trim();
    const editId = document.getElementById("customer-id").value;
    if (editId && editId === id) {
        const idx = customers.findIndex(c => c.id === id);
        if (idx > -1) customers[idx] = { id, name, address, phone, email, username, password };
    } else {
        if (!customers.some(c => c.id === id))
            customers.push({ id, name, address, phone, email, username, password });
        else {
            alert("Mã khách hàng đã tồn tại!");
            return;
        }
    }
    saveCustomers(customers);
    hideCustomerForm();
    renderCustomers();
};

if(document.getElementById("customer-tbody"))
document.getElementById("customer-tbody").onclick = function(e) {
    if (e.target.classList.contains("edit-btn")) {
        const id = e.target.dataset.id;
        const customer = customers.find(c => c.id === id);
        showCustomerForm(customer);
    }
    if (e.target.classList.contains("delete-btn")) {
        const id = e.target.dataset.id;
        if (confirm("Bạn chắc chắn muốn xóa khách hàng?")) {
            customers = customers.filter(c => c.id !== id);
            saveCustomers(customers);
            renderCustomers();
        }
    }
};

// Auto update khi reload trang
window.addEventListener('storage', function(e) {
    if(e.key === LS_KEY) {
        products = loadProducts();
        renderProducts();
    }
    if(e.key === LS_KEY_CUSTOMER) {
        customers = loadCustomers();
        renderCustomers();
    }
});

// -- CRUD ĐƠN HÀNG --
const LS_KEY_ORDER = 'crud_orders';

function loadOrders() {
    try {
        const raw = localStorage.getItem(LS_KEY_ORDER);
        return raw ? JSON.parse(raw) : [];
    } catch(e) { return []; }
}

function saveOrders(orders) {
    localStorage.setItem(LS_KEY_ORDER, JSON.stringify(orders));
}

let orders = loadOrders();

// Hàm lấy tên khách hàng từ ID
function getCustomerName(id) {
    const c = customers.find(item => item.id === id);
    return c ? c.name : "N/A";
}

// Hàm lấy tên SP và tính tiền
function getProductInfo(id) {
    const p = products.find(item => item.id === id);
    return p ? { name: p.name, price: p.price } : { name: "N/A", price: 0 };
}

function renderOrders() {
    const tbody = document.getElementById("order-tbody");
    if(!tbody) return;
    tbody.innerHTML = "";
    
    orders.forEach(o => {
        const pInfo = getProductInfo(o.productId);
        const total = pInfo.price * o.quantity;
        const statusText = o.status === 'completed' ? 'Đã xong' : 'Đang xử lý';
        const statusClass = o.status === 'completed' ? 'status-completed' : 'status-processing';

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${o.code}</td>
            <td>${getCustomerName(o.customerId)}</td>
            <td>${pInfo.name}</td>
            <td>${o.quantity}</td>
            <td>${total.toLocaleString()}đ</td>
            <td><span class="status-tag ${statusClass}">${statusText}</span></td>
            <td>
                <button class="edit-btn" data-id="${o.code}">Sửa</button>
                <button class="delete-btn" data-id="${o.code}">Xóa</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Đổ dữ liệu vào Select khi mở form
function populateDropdowns() {
    const cSelect = document.getElementById("order-customer");
    const pSelect = document.getElementById("order-product");
    
    cSelect.innerHTML = customers.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    pSelect.innerHTML = products.map(p => `<option value="${p.id}">${p.name} (${p.price.toLocaleString()}đ)</option>`).join('');
}

// Sự kiện Form đơn hàng
document.getElementById("show-add-order-form").onclick = () => {
    populateDropdowns();
    document.getElementById("order-form").classList.remove("hide");
    document.getElementById("order-id-hidden").value = "";
    document.getElementById("order-form").reset();
    document.getElementById("order-code").disabled = false;
};

document.getElementById("cancel-order-btn").onclick = () => {
    document.getElementById("order-form").classList.add("hide");
};

document.getElementById("order-form").onsubmit = function(e) {
    e.preventDefault();
    const code = document.getElementById("order-code").value.trim();
    const customerId = document.getElementById("order-customer").value;
    const productId = document.getElementById("order-product").value;
    const quantity = parseInt(document.getElementById("order-quantity").value);
    const status = document.getElementById("order-status").value;
    const editId = document.getElementById("order-id-hidden").value;

    if (editId) {
        const idx = orders.findIndex(o => o.code === editId);
        if (idx > -1) orders[idx] = { code, customerId, productId, quantity, status };
    } else {
        if (orders.some(o => o.code === code)) return alert("Mã vận đơn đã tồn tại!");
        orders.push({ code, customerId, productId, quantity, status });
    }

    saveOrders(orders);
    renderOrders();
    document.getElementById("order-form").classList.add("hide");
};

// Sửa/Xóa Đơn hàng
document.getElementById("order-tbody").onclick = function(e) {
    const id = e.target.dataset.id;
    if (e.target.classList.contains("edit-btn")) {
        const o = orders.find(item => item.code === id);
        populateDropdowns();
        document.getElementById("order-id-hidden").value = o.code;
        document.getElementById("order-code").value = o.code;
        document.getElementById("order-code").disabled = true;
        document.getElementById("order-customer").value = o.customerId;
        document.getElementById("order-product").value = o.productId;
        document.getElementById("order-quantity").value = o.quantity;
        document.getElementById("order-status").value = o.status;
        document.getElementById("order-form").classList.remove("hide");
    }
    if (e.target.classList.contains("delete-btn")) {
        if (confirm("Xóa đơn hàng này?")) {
            orders = orders.filter(o => o.code !== id);
            saveOrders(orders);
            renderOrders();
        }
    }
};

// Gọi render lần đầu
renderOrders();


//thong ke
// -- THỐNG KÊ BÁO CÁO --


let myChart = null; // Biến toàn cục để quản lý biểu đồ

function renderReports() {
    const completedOrders = orders.filter(o => o.status === 'completed');
    
    let totalRevenue = 0;
    let productSales = {};

    completedOrders.forEach(o => {
        const pInfo = getProductInfo(o.productId);
        const amount = pInfo.price * o.quantity;
        totalRevenue += amount;

        if (productSales[o.productId]) {
            productSales[o.productId].qty += o.quantity;
            productSales[o.productId].revenue += amount;
        } else {
            productSales[o.productId] = {
                name: pInfo.name,
                qty: o.quantity,
                revenue: amount
            };
        }
    });
    // 2. Hiển thị lên các ô tổng quát
    document.getElementById("stat-revenue").innerText = totalRevenue.toLocaleString() + "đ";
    document.getElementById("stat-order-count").innerText = completedOrders.length;
    document.getElementById("stat-customer-count").innerText = customers.length;
    document.getElementById("stat-product-count").innerText = products.length;


    // vẽ
    const labels = Object.values(productSales).map(item => item.name);
    const dataRevenue = Object.values(productSales).map(item => item.revenue);

    const ctx = document.getElementById('revenueChart').getContext('2d');
    
    // Nếu biểu đồ đã tồn tại thì xóa đi để vẽ lại (tránh lỗi chồng chéo)
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'bar', // Bạn có thể đổi thành 'pie' (tròn) hoặc 'line' (đường)
        data: {
            labels: labels,
            datasets: [{
                label: 'Doanh thu (VNĐ)',
                data: dataRevenue,
                backgroundColor: 'rgba(45, 108, 223, 0.7)',
                borderColor: '#2d6cdf',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // 3. Hiển thị bảng chi tiết sản phẩm bán chạy
    const tbody = document.getElementById("report-tbody");
    if (!tbody) return;
    tbody.innerHTML = "";

    for (let id in productSales) {
        const item = productSales[id];
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>${item.revenue.toLocaleString()}đ</td>
        `;
        tbody.appendChild(tr);
    }
}

// Cập nhật hàm chuyển tab để khi nhấn vào "Thống kê" thì nó tự tính toán lại
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // ... (giữ nguyên các code chuyển tab cũ của bạn) ...
        
        // Nếu nhấn vào menu thống kê
        if (item.id === 'menu-report') {
            renderReports();
        }
    });
});
