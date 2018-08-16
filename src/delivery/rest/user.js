module.exports = [
  {
    method: "GET",
    url: "/user",
    controller: "user/listPasien",
    privillage: ["admin", "pendaftaran"]
  },
  {
    method: "POST",
    url: "/pasien",
    controller: "pasien/listPasien",
    privillage: ["admin", "pendaftaran"]
  }
];
