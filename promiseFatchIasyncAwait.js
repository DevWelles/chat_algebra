

// async/awaitom idemo dohvatiti "poslane poruke" sa pripremljenog vam backenda
async function dohvatiPoruke(url) {
  var porukaDohvacena = await fetch(url); //u var porukaDohvacena će biti spremljen new Promise koji će biti resolvan(fullfiled ili rejected). Zato što fetch vraća new Promise a key word await čeka taj promise da se resolva 
  var arrayPor = await porukaDohvacena.json(); //awaitamo da se Promise koji se zove porukaDohvacena resolva, i ako bude fuullfiled ce se pretvorit u json
  console.log(arrayPor); //array svih objekata poruka
  return arrayPor 
 }

  //funkcija za izvlačenje(ispis) svih poruka
  function ispis (arrSvihPoruka) {
    let ispis = arrSvihPoruka.map(por => `${por.imePrezime}: ${por.poruka}
    time: ${por.vrijeme}`)
    return ispis
   }
dohvatiPoruke(
  "https://www.digital-abundance.hr/vracamJson.php?option=dohvatiPoruke"
);

//za slati nove poruke na API


//Btn pošalji por i njegov event onclick 
const slanjeBtn = document.getElementById("slanje");

const slanjeFunc = () => {
  var mojaPor = document.getElementById("poruka").value;
  var imePrezime = "Zvone";
  console.log(mojaPor) 
  fetch(`https://www.digital-abundance.hr/vracamJson.php?option=dodajPoruku&&imePrezime=${imePrezime}&&poruka=${mojaPor}`)
};

slanjeBtn.onclick = async () => {
  await slanjeFunc() //sa ovim pošaljem svoju por unutar input fielda
  var arrSvihPorObjekata = await dohvatiPoruke( //ovo je asyncronous funkcija i čekam ju da mi vrati array svih objekata poruka
    "https://www.digital-abundance.hr/vracamJson.php?option=dohvatiPoruke"
  );
  var p = document.createElement("p")
  document.getElementById("chat").appendChild(p);
  console.log(arrSvihPorObjekata)
  if(document.getElementById("chat").innerText == arrSvihPorObjekata[arrSvihPorObjekata.length-1]){ //pokuša sam spriječiti da mi pošalje istu por 2 put jer mi se to nekad desi
    console.log("its the same")
    return
  }else {
    chat.lastElementChild.innerText = ispis(arrSvihPorObjekata)[arrSvihPorObjekata.length-1]
  }
};

//Btn za prikaz svih poruka
const svePorBtn = document.getElementById("svePoruke");

svePorBtn.onclick = async () => {
  let svePor = await dohvatiPoruke(
    "https://www.digital-abundance.hr/vracamJson.php?option=dohvatiPoruke"
  );
  svePor = ispis(svePor);
  
  for(let i = 0; i<svePor.length; i++){
    var p = document.createElement("p")
    document.getElementById("chat").appendChild(p)
    p.innerText = svePor[i]
  }
}

 //zaprimanje novih poruka sa servera(por koje koelgešalju) 
var eventSource = new EventSource("https://www.digital-abundance.hr/vracamJson.php?option=dohvatiPoruke");
eventSource.onmessage = () =>{
  var newMessage = document.createElement("p")
  newMessage.innerText = e.data
  document.getElementById("chat").appendChild(newMessage)
} //baca error u consolu. Pokušavao sam pronaći neki event koji će očitavati promjene na serveru da detektira nove poruke od kolega
  //trebao bi proučit MDN dokumentaciju još o tome, ali nisam više stigao danas

// "Ajde malo isprobavajte. Stavite da se dinamički hvata nova poruka sa sučelja (websitea), te tek onda šalje.";
//pripremljeniURL = `https://www.digital-abundance.hr/vracamJson.php?option=dodajPoruku&&imePrezime=${imePrezime}&&poruka=${novaPoruka}`;

//odkomentiraj fetch da se pošalje. Budi pažljiv nemojte mi spamati server jer nisam postavio da se brišu poruke. Stvait ću to da se svaki dan počiste poruke od jučer, ali još nisam.
//Ovo vam služi samo kao priprema da napravite vlastiti frontend za ovaj chat API
//fetch(pripremljeniURL);





