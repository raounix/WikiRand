const { ipcRenderer } = require('electron')
const $ = require('jquery')
const btn = document.getElementById('Generator')
const toast = require('toastr')
const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://fa.wikipedia.org/wiki/Special:Random';
Attr();


btn.addEventListener('click', () => {


        toast.success("Please Wait For Receive ", "Loading ...", { timeOut: 2000 });


        axios(url)
            .then(response => {
                const html = response.data;
                document.getElementById("learn").href = response.request.responseURL;
                const $ = cheerio.load(html)
                const statsTable = $('.firstHeading').text();
                const Body = $('.mw-parser-output p').text();
                var imgsrc = $('.thumbinner img ').attr('src');
                document.getElementById("Main-Image").src = imgsrc;
                if (imgsrc == null) {
                    const title = response.request.responseURL;
                    const url = title.match(/([^\/]*)\/*$/)[1];
                    const ur = "https://fa.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=" + url;

                    axios(ur).then(r => {
                        json = r.data['query']['pages'];
                        Object.keys(json).forEach(function(key) {
                            imgsrc = json[key]['original']['source'];
                            document.getElementById("Main-Image").src = imgsrc;


                        })
                    })
                } else {
                    imgsrc = "https:" + imgsrc;
                    document.getElementById("Main-Image").src = imgsrc;
                }

                document.getElementById("Main-Text").innerHTML = Body;




                document.getElementById('Header-Text').innerHTML = statsTable

            })
    }




)



function Attr() {
    toast.options.closeButton = true;
    toast.options.showMethod = 'slideDown';
    toast.options.hideMethod = 'slideUp';
    toast.options.closeMethod = 'slideUp';
    toast.options.progressBar = true
}

function Error_Image_Load() {
    document.getElementById("Main-Image").src = "https://icon-library.net/images/photo-gallery-icon-vector/photo-gallery-icon-vector-10.jpg"
}