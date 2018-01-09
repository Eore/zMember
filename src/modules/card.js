var
fs = require('fs'),
PDFkit = require('pdfkit'),
QRimage = require('qr-image');

var lebar = 9;
var tinggi = 5.5;
var conv = (n) => n * 0.3937 * 72;

module.exports = (data, pipe) => {
    var GenQR = QRimage.svgObject(data.id);
    var PDF = new PDFkit({
        size : [conv(lebar), conv(tinggi)]
    });
    var size = () => data.nama.length <= 20 ? 15 : 12;

    PDF
    .image('./bitmap.png', 0, 0, {width : conv(lebar), height : conv(tinggi)})
    .fontSize(10)
    .text(data.id, 10, conv(tinggi) - 35, {width : conv(lebar), height : conv(tinggi)})
    .fontSize(size())
    .text(data.nama, {width : conv(lebar), height : conv(tinggi)})
    .moveUp()
    .scale(2.5)
    .moveTo(0,0)
    .translate((PDF.page.width / 2.5) - GenQR.size - 2, (PDF.page.height / 2.5) - GenQR.size - 2)
    .path(GenQR.path)
    .fill('black', 'even-odd')

    PDF.end();
    return PDF.pipe(pipe);
}


