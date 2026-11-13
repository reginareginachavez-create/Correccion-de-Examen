var btnSave = document.getElementById("btnSave");
var btnCancel = document.getElementById("btnCancel");
var btnClose = document.getElementById("btnClose");
var modalAdd = document.getElementById("addProducto");
let productos = JSON.parse(localStorage.getItem("productos")) || [];

const cerrarModal = () => {
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    modalAdd.close();
};

btnCancel.onclick = () => {
    cerrarModal();
};

btnClose.onclick = () => {
    cerrarModal();
};

btnSave.onclick = () => {
    let txtNombre = document.getElementById("nombre");
    let txtPrecio = document.getElementById("precio");
    if (txtNombre.value.trim() == "" || txtPrecio.value.trim() == "") {
        cerrarModal();
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'CAMPOS VACIOS'
        });
        return;
    }
    const producto = {
        nombre: txtNombre.value,
        precio: txtPrecio.value
    };
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
    cargarProductos();
    cerrarModal();
};

const cargarProductos = () => {
    productos = JSON.parse(localStorage.getItem("productos")) || [];
    let tbody = document.getElementById("productos");
    var tabla = "";
    let posicion = -1;

    productos.map((producto) => {
        posicion++;
        tabla += `<tr class="text-center">
            <td><b>${producto.nombre.toUpperCase()}</b></td>
            <td><b>$ ${parseFloat(producto.precio).toFixed(2)}</b></td>
            <td><b>1</b></td>
            <td><b>$ ${parseFloat(producto.precio).toFixed(2)}</b></td>
            <td>
                <button class="btn-solid theme-danger" onclick="eliminarProducto(${posicion})"><i class="bi bi-trash3"></i></button>
                <button class="btn-solid theme-warning" onclick="editarProducto(${posicion})"><i class="bi bi-pencil"></i></button>
            </td>
        </tr>`;
    });
    tbody.innerHTML = tabla;
};

cargarProductos();

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn-solid theme-success mx-5",
        cancelButton: "btn-solid theme-danger"
    },
    buttonsStyling: false
});

const eliminarProducto = (posicion) => {
    let precioElemento = productos[posicion].precio;
    console.log("Posición:", posicion, "| Precio:", precioElemento);

    swalWithBootstrapButtons.fire({
        title: "ELIMINAR REGISTRO",
        text: "Estas seguro de eliminar este registro?",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "SI ",
        cancelButtonText: "NO",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            productos.splice(posicion, 1);
            localStorage.setItem("productos", JSON.stringify(productos));
            cargarProductos();
            Swal.fire({
                title: "EXITO",
                text: `Se eliminó el registro  ${posicion} con precio $${parseFloat(precioElemento).toFixed(2)}`,
                icon: "success"
            });
        }
    });
};

const editarProducto = (posicion) => {
    let precioElemento = productos[posicion].precio;
    console.log("Posición:", posicion, "| Precio:", precioElemento);
};