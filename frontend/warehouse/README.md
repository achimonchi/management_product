# Frontend Aplikasi Manajemen Produk

## Tentang Project

Project ini dibangun menggunakan [Create React App](https://github.com/facebook/create-react-app).
Aplikasi ini menggunakan `statefull component`, namun ada beberapa bagian yang menggunakan `stateless component`.
Aplikasi ini dibangun oleh **_Reyhan Jovie_** 

## Menjalankan Project

Untuk menjalankan project ini, bisa dengan :

### `npm start`

## Library yang digunakan

Adapun **dependencies** yang saya gunakan adalah :

`axios` untuk fetching data

`base-64` untuk encoding token

`bootstrap` untuk membantu menghandle css

`moment` untuk format waktu dan tanggal

`reactstrap` bootstrap v4 untuk reactjs

`react-router-dom` untuk router

`react-icon` untuk icon icon pada reactjs

## Cara Menggunakan Aplikasi

- Pada aplikasi ini, hanya mempunyai 1 level yaitu `admin`
- akunnya adalah
```
email    : admin@gmail.com
password : admin
```
- Token akan disimpan di localstorage dengan nama `admin_token`
- Ada 4 fitur, yaitu :
    - Admin
        - create : menambah admin
        - update : mengubah data admin
        - delete : menghapus admin
        - read   : melihat list admin
    - Category
        - create : menambah category baru
        - update : mengubah data category
        - delete : menghapus category
        - read   : melihat list category
    - Product
        - create : menambah product baru
        - update : mengubah data product
        - delete : menghapus product
        - read   : melihat list product
    - History
        - product_in : menambah stok produk dan tercatat di riwayat (create)
        - product_out : mengurangi stok produk dan tercatat di riwayat (create)
        - update : hanya bisa mengubah stok, dan tidak bisa mengubah status product dari `In` menjadi `Out` atau sebaliknya.
- Untuk melakukan fungsi diatas, harus telah login, dan tokennya diletak di header request
- Untuk logout, cukup dengan membersihkan / menghapus localstorage admin_login
