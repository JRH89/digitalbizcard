const urlParams = new URLSearchParams(window.location.search);

const name = urlParams.get('name');
const job = urlParams.get('job');
const email = urlParams.get('email');
const phone = urlParams.get('phone');
const social1 = urlParams.get('social1');
const social2 = urlParams.get('social2');
const social3 = urlParams.get('social3');
const social4 = urlParams.get('social4');
const social1Label = urlParams.get('social1Label');
const social2Label = urlParams.get('social2Label');
const social3Label = urlParams.get('social3Label');
const social4Label = urlParams.get('social4Label');

document.getElementById('profile-name').textContent = name;
document.getElementById('profile-job').textContent = job;
document.getElementById('profile-email-link').href = `mailto:${email}`;
document.getElementById('profile-phone-link').href = `tel:${phone}`;

const socialLinksUl = document.querySelector('.bottom-right ul');

if (social1) {
  const social1Li = document.createElement('li');
  const social1Link = document.createElement('a');
  social1Link.href = social1;
  social1Link.target = '_blank';
  social1Link.textContent = social1Label;
  social1Li.appendChild(social1Link);
  socialLinksUl.appendChild(social1Li);
}

if (social2) {
  const social2Li = document.createElement('li');
  const social2Link = document.createElement('a');
  social2Link.href = social2;
  social2Link.target = '_blank';
  social2Link.textContent = social2Label;
  social2Li.appendChild(social2Link);
  socialLinksUl.appendChild(social2Li);
}

if (social3) {
  const social3Li = document.createElement('li');
  const social3Link = document.createElement('a');
  social3Link.href = social3;
  social3Link.target = '_blank';
  social3Link.textContent = social3Label;
  social3Li.appendChild(social3Link);
  socialLinksUl.appendChild(social3Li);
}

if (social4) {
  const social4Li = document.createElement('li');
  const social4Link = document.createElement('a');
  social4Link.href = social4;
  social4Link.target = '_blank';
  social4Link.textContent = social4Label;
  social4Li.appendChild(social4Link);
  socialLinksUl.appendChild(social4Li);
}

const vcardDownloadButton = document.getElementById('vcard-download-button');
vcardDownloadButton.addEventListener('click', function() {
  const vcardUrl = `data:text/vcard;charset=utf-8,`
                 + `BEGIN:VCARD\r\n`
                 + `VERSION:4.0\r\n`
                 + `FN:${name}\r\n`
                 + `TITLE:${job}\r\n`
                 + `TEL;TYPE=work,voice:${phone}\r\n`
                 + `EMAIL:${email}\r\n`
                 + `URL:${social1}\r\n`
                 + `URL:${social2}\r\n`
                 + `URL:${social3}\r\n`
                 + `URL:${social4}\r\n`
                 + `END:VCARD`;

  const downloadLink = document.createElement('a');
  downloadLink.setAttribute('href', vcardUrl);
  downloadLink.setAttribute('download', `${name}.vcf`);
  downloadLink.click();
});


function makeCall(event) {
  event.preventDefault();

  const phoneNumber = phone;

  const phoneLink = document.getElementById("profile-phone-link");
  phoneLink.innerHTML = '<i class="fa fa-phone"></i> ' + phoneNumber;

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.location.href = "tel:" + phoneNumber;
  }
}