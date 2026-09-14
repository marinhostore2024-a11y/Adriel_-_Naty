/* =========================
   CONTADOR
   ========================= */

/*
   COLOQUE A DATA EM QUE VOCÊS COMEÇARAM.

   Formato:

   ANO, MÊS - 1, DIA, HORA, MINUTO

   Exemplo:
   29 de janeiro de 2026 às 20:00

   new Date(2026, 0, 29, 20, 0)
*/

const inicio = new Date(2026, 0, 29, 20, 0);


function atualizarContador() {

    const agora = new Date();

    let anos = agora.getFullYear() - inicio.getFullYear();

    let meses = agora.getMonth() - inicio.getMonth();

    let dias = agora.getDate() - inicio.getDate();

    let horas = agora.getHours() - inicio.getHours();

    let minutos = agora.getMinutes() - inicio.getMinutes();

    let segundos = agora.getSeconds() - inicio.getSeconds();


    if (segundos < 0) {
        segundos += 60;
        minutos--;
    }

    if (minutos < 0) {
        minutos += 60;
        horas--;
    }

    if (horas < 0) {
        horas += 24;
        dias--;
    }

    if (dias < 0) {

        const ultimoDiaMesAnterior =
            new Date(
                agora.getFullYear(),
                agora.getMonth(),
                0
            ).getDate();

        dias += ultimoDiaMesAnterior;

        meses--;
    }

    if (meses < 0) {
        meses += 12;
        anos--;
    }


    document.getElementById("years").textContent = anos;
    document.getElementById("months").textContent = meses;
    document.getElementById("days").textContent = dias;
    document.getElementById("hours").textContent = horas;
    document.getElementById("minutes").textContent = minutos;
    document.getElementById("seconds").textContent = segundos;
}


setInterval(atualizarContador, 1000);

atualizarContador();



/* =========================
   PLAYER
   ========================= */

const audio = document.getElementById("audio");

const playButton =
    document.getElementById("playButton");

const progress =
    document.getElementById("progress");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");



/* PLAY / PAUSE */

playButton.addEventListener("click", () => {

    if (audio.paused) {

        audio.play();

        playButton.innerHTML =
            '<i class="fa-solid fa-pause"></i>';

    } else {

        audio.pause();

        playButton.innerHTML =
            '<i class="fa-solid fa-play"></i>';
    }

});



/* DURAÇÃO DA MÚSICA */

audio.addEventListener("loadedmetadata", () => {

    progress.max = audio.duration;

    duration.textContent =
        formatTime(audio.duration);

});



/* ATUALIZAR BARRA */

audio.addEventListener("timeupdate", () => {

    progress.value = audio.currentTime;

    currentTime.textContent =
        formatTime(audio.currentTime);

});



/* CLICAR NA BARRA */

progress.addEventListener("input", () => {

    audio.currentTime = progress.value;

});



/* QUANDO TERMINAR */

audio.addEventListener("ended", () => {

    playButton.innerHTML =
        '<i class="fa-solid fa-play"></i>';

    progress.value = 0;

});



/* FORMATAR TEMPO */

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutos =
        Math.floor(seconds / 60);

    const segundos =
        Math.floor(seconds % 60);

    return `${minutos}:${segundos
        .toString()
        .padStart(2, "0")}`;
}