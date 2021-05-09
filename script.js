let categories = ['teddy']
let main = document.getElementById('main')

for (let i = 0; i < categories.length; i++){
    html = "<section>"
        + "<h2>" + categories[i] + "<h2>"
        + "<div class=content>"
        + "</div>"
        + "</section>"

    fetch('http://localhost:3000/api/teddies')
    .then(response => {
        console.log(response)
        for(let x=0; x<response.length; x++){
            let articleHtml = 
                "<figure>"
                    "<img src '" + response.img + "'>"
                    "<figcaption>"
                        "<p>" + response.price + "</p>"
                        "<p>" + response.description + "</p>"
                    "</figcaption>"
                "</figure>"
                console.log(html.getElementsByClass('content'))
                html.getElementsByClass('content')[0].append = articleHtml
        }
    })
    main.innerHTML = html
}