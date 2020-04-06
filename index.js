const fetch = require('node-fetch');
const readlineSync = require('readline-sync');
var randomize = require('randomatic')
var random = require('random-name')
const { URLSearchParams } = require('url');
const cheerio = require('cheerio');

const getCookie = (reff) => new Promise((resolve, reject) => {
    fetch(`https://app.cryptoboard.media/registerInvite/${reff}`, {
        method: 'GET',
        headers: {
            'Host': 'app.cryptoboard.media',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
            'Sec-Fetch-Dest': 'document',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9'
        }
    }).then(async res => {
        const $ = cheerio.load(await res.text());
        const result = {
            cookie: res.headers.raw()['set-cookie'],
            csrf: $('input[name=csrfmiddlewaretoken]').attr('value')
        }

        resolve(result)
    })
    .catch(err => reject(err))
});

const functionRegist = (csrf, email, CookieRegist, reff) => new Promise((resolve, reject) => {
    const params = new URLSearchParams;
    params.append('csrfmiddlewaretoken', csrf);
    params.append('invitation_code', reff);
    params.append('email', email);
    params.append('password1', `Berak321#`);
    params.append('password2', 'Berak321#');

    fetch('https://app.cryptoboard.media/registerInvitedToSupport/', { 
        method: 'POST', 
        body: params,
        headers: {
            'Host': 'app.cryptoboard.media',
            'Connection': 'keep-alive',
            'Content-Length': 191,
            'Cache-Control': 'max-age=0',
            'Origin': 'https://app.cryptoboard.media',
            'Upgrade-Insecure-Requests': 1,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
            'Sec-Fetch-Dest': 'document',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Referer': `https://app.cryptoboard.media/registerInvite/${reff}`,
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cookie': CookieRegist
        }
    })
    .then(res => res.text())
    .then(result => {
    const $ = cheerio.load(result);
        //const resText = $('h7').text();
        resolve(result);
    })
    .catch(err => reject(err))
});

(async () => {
    const reff = readlineSync.question('[?] Kode reff: ')
    const jumlah = readlineSync.question('[?] Jumlah reff: ')
    for (var i = 0; i < jumlah; i++){
    try {
        const cookie = await getCookie(reff)
        const CookieRegist = cookie.cookie[0].split(';')[0]
        const csrf = cookie.csrf
        const rand = randomize('0', 0)
        const name = random.first()
        const email = `${name}${rand}@gmail.com`
        const regist = await functionRegist(csrf, email, CookieRegist, reff)
        // if (regist){
        //     console.log(`[!] Sukses!`)
        // } else {
        //     console.log('[!] Gagal!')
        // }
        console.log('[!] Sukses!')
    } catch (e) {
        console.log(e)
}
    }
})()