var semuaProduk = [];
var kodeIncrement = 1;

// untuk mode edit
var modeEdit = false;

// index produk yang mau diedit
var indexProdukEdit = null;


function menyimpanProduk () {
    var kodeProduk = document.getElementById('Kode-Produk').value;
    var namaProduk = document.getElementById('Nama-Produk').value;
    var hargaProduk = document.getElementById('Harga-Produk').value;
    var satuanProduk = document.getElementById('Satuan-Produk').value;
    var kategoriProduk = document.getElementById('Kategori-Produk').value;
    var urlGambar= document.getElementById('URL-Produk').value;
    var stokAwal = document.getElementById('Stok-awal').value;

      if (!namaProduk || !hargaProduk || !stokAwal) {
        alert("Harap isi semua data dengan benar!");
        return;
    }

    if (modeEdit) {
        //  update produk lama
        semuaProduk[indexProdukEdit] = {
            kodeProduk,
            namaProduk,
            hargaProduk,
            satuanProduk,
            kategoriProduk,
            urlGambar,
            stokAwal,
        };

        modeEdit = false;

        indexProdukEdit = null;
    } else {
        // nambah produk baru
        semuaProduk.push({
            kodeProduk,
            namaProduk,
            hargaProduk,
            satuanProduk,
            kategoriProduk,
            urlGambar,
            stokAwal,
        });
                                            
        kodeIncrement++;
    }

    document.getElementById('Kode-Produk').value = 'MD-' + String(kodeIncrement).padStart(3, '0');
    document.getElementById('Nama-Produk').value = '';
    document.getElementById('Harga-Produk').value = '';
    document.getElementById('Satuan-Produk').value = '';
    document.getElementById('Kategori-Produk').value = '';
    document.getElementById('URL-Produk').value = '';
    document.getElementById('Stok-awal').value = '';
   
    console.log(kodeProduk);
    console.log(namaProduk);
    console.log(hargaProduk);
    console.log(satuanProduk);
    console.log(kategoriProduk);
    console.log(urlGambar);
    console.log(stokAwal);
    tampilanTabel();
}

document.getElementById('Kode-Produk').value = 'MD-' + String(kodeIncrement).padStart(3, '0');


function editProduk(index) {
    var produkUntukDiEdit = semuaProduk[index];

    // console.log(produkUntukDiEdit);
    document.getElementById('Kode-Produk').value = produkUntukDiEdit.kodeProduk;
    document.getElementById('Nama-Produk').value = produkUntukDiEdit.namaProduk;
    document.getElementById('Harga-Produk').value = produkUntukDiEdit.hargaProduk;
    document.getElementById('Satuan-Produk').value = produkUntukDiEdit.satuanProduk;
    document.getElementById('Kategori-Produk').value = produkUntukDiEdit.kategoriProduk;
    document.getElementById('URL-Produk').value = produkUntukDiEdit.urlGambar;
    document.getElementById('Stok-awal').value = produkUntukDiEdit.stokAwal;

    modeEdit = true;

    indexProdukEdit = index;

}


function menghapusProduk(index) {
    // proses hapus data berdasarkan index array
    semuaProduk.splice(index, 1);

    // Merender ulang table 
    tampilanTabel();
}

// menampilkan tabel
function tampilanTabel() {
    var tBody = document.getElementById("isi-data");

    tBody.innerHTML = '';

    semuaProduk.forEach(function (produk, index) {
        var tr = tBody.insertRow();
        var warning = 'white';

        if (produk.stokAwal < 5) {
            warning = 'red';
        }

        // pakai bactick `
        tr.innerHTML = `
            <td>${index +1}</td>
            <td>${produk.kodeProduk}</td>
            <td>${produk.namaProduk}</td>
            <td>${produk.hargaProduk}</td>
            <td>${produk.satuanProduk}</td>
            <td>${produk.kategoriProduk}</td>
            <td>
                <img src="${produk.urlGambar}" alt="${produk.namaProduk}" width="90px" height="50px">
            </td>
            <td style="background-color: ${warning};">${produk.stokAwal}</td>
            <td><button onclick="editProduk(${index})"> edit </button> | <button onclick="menghapusProduk(${index})">delete</button>
            </td>    
        ` ;
    });
}
