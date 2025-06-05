function main() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.translate(canvas.width / 2, canvas.height / 2);
}

main();