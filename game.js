
const $ = (selector) => document.querySelector(selector);

let cells = [];
let hand = [];
let rhand = [];
let playerDeck = [];
let rivalDeck = [];
let selected = null;
let round = 1;
let playerTurn = true;
let done = false;

const catalog = [
  [1, "Buku Teman", "Aku suka membaca buku.", "Membaca"],
  [1, "Kelas Bersih", "Kelas harus bersih.", "Kebersihan"],
  [1, "Teman Baik", "Kita harus baik kepada teman.", "Persahabatan"],
  [1, "Pohon Hijau", "Pohon itu penting.", "Lingkungan"],
  [1, "Tubuh Sehat", "Kita perlu berolahraga.", "Kesehatan"],

  [2, "Waktu Membaca", "Aku ingin membaca setiap hari.", "Membaca"],
  [2, "Buang Sampah", "Sampah harus dibuang ke tempatnya.", "Kebersihan"],
  [2, "Saling Membantu", "Teman harus saling membantu.", "Persahabatan"],
  [2, "Hemat Air", "Kita harus menghemat air.", "Lingkungan"],
  [2, "Sarapan Pagi", "Aku ingin sarapan sebelum sekolah.", "Kesehatan"],

  [3, "Perpustakaan", "Sekolah perlu memiliki perpustakaan.", "Membaca"],
  [3, "Piket Kelas", "Semua siswa perlu ikut piket.", "Kebersihan"],
  [3, "Tidak Mengejek", "Kita tidak boleh mengejek teman.", "Persahabatan"],
  [3, "Tanam Pohon", "Kita sebaiknya menanam pohon.", "Lingkungan"],
  [3, "Makanan Sehat", "Kita perlu makan sayur dan buah.", "Kesehatan"],

  [4, "Ilmu Baru", "Membaca bermanfaat karena kita dapat mengetahui hal baru.", "Membaca"],
  [4, "Kelas Nyaman", "Kelas perlu dibersihkan agar nyaman untuk belajar.", "Kebersihan"],
  [4, "Kerja Sama", "Kita harus bekerja sama karena pekerjaan menjadi lebih ringan.", "Persahabatan"],
  [4, "Air Bersih", "Kita perlu menjaga air karena semua makhluk hidup membutuhkannya.", "Lingkungan"],
  [4, "Olahraga", "Olahraga penting karena membantu menjaga kesehatan tubuh.", "Kesehatan"],

  [5, "Buku Pengetahuan", "Membaca buku pengetahuan membantu kita belajar karena buku memberikan informasi baru.", "Membaca"],
  [5, "Sampah Terpilah", "Sampah sebaiknya dipilah karena beberapa jenis sampah dapat didaur ulang.", "Kebersihan"],
  [5, "Berbagi", "Kita sebaiknya berbagi karena dapat membantu teman yang membutuhkan.", "Persahabatan"],
  [5, "Pohon Peneduh", "Kita perlu menanam pohon karena pohon memberi keteduhan dan membantu menjaga lingkungan.", "Lingkungan"],
  [5, "Sarapan Bergizi", "Sarapan bergizi penting karena tubuh memerlukan energi untuk beraktivitas.", "Kesehatan"],

  [6, "Rajin Membaca", "Membaca rutin menambah pengetahuan karena kita menemukan informasi dan gagasan baru.", "Membaca"],
  [6, "Tanggung Jawab", "Setiap siswa perlu menjaga kelas karena kebersihan bukan hanya tugas petugas piket.", "Kebersihan"],
  [6, "Mendengarkan", "Kita harus mendengarkan pendapat teman karena setiap orang dapat memiliki pandangan berbeda.", "Persahabatan"],
  [6, "Menghemat Air", "Kita perlu menghemat air agar persediaan air bersih cukup untuk kebutuhan bersama.", "Lingkungan"],
  [6, "Cuci Tangan", "Kita perlu mencuci tangan dengan sabun karena tangan dapat membawa kotoran dan kuman.", "Kesehatan"],

  [7, "Kebiasaan Membaca", "Siswa perlu membiasakan membaca karena membaca menambah pengetahuan. Buku tentang hewan, misalnya, mengajarkan tempat hidup dan makanan hewan.", "Membaca"],
  [7, "Kelas Sehat", "Kelas harus dijaga kebersihannya agar nyaman. Karena itu, siswa perlu membuang sampah pada tempatnya.", "Kebersihan"],
  [7, "Menghargai Perbedaan", "Kita harus menghargai perbedaan karena setiap teman memiliki kesukaan dan kemampuan berbeda. Dengan begitu, kita bisa belajar bersama.", "Persahabatan"],
  [7, "Menjaga Pohon", "Pohon perlu dirawat karena membantu membuat lingkungan lebih sejuk. Pohon di halaman sekolah, misalnya, dapat menjadi tempat berteduh.", "Lingkungan"],
  [7, "Kebiasaan Sehat", "Kita perlu menjaga kesehatan agar bisa belajar dan bermain. Caranya antara lain makan bergizi, berolahraga, dan cukup tidur.", "Kesehatan"],

  [8, "Membaca dan Berpikir", "Membaca rutin membantu kita memahami gagasan baru. Setelah membaca cerita, misalnya, kita dapat menjelaskan sifat tokoh dan alasan tindakannya.", "Membaca"],
  [8, "Pengelolaan Sampah", "Sekolah perlu mengelola sampah agar lingkungan nyaman. Sampah organik seperti daun dapat dijadikan kompos untuk menyuburkan tanaman.", "Kebersihan"],
  [8, "Menyelesaikan Masalah", "Masalah dengan teman sebaiknya dibicarakan karena bertengkar tidak membantu kita memahami masalah. Dengan saling mendengarkan, kita bisa mencari jalan keluar.", "Persahabatan"],
  [8, "Hemat Energi", "Kita perlu menghemat listrik agar energi tidak digunakan berlebihan. Lampu dan kipas dapat dimatikan saat ruangan tidak digunakan.", "Lingkungan"],
  [8, "Makanan Beragam", "Kita perlu makan beragam makanan karena tubuh membutuhkan berbagai zat gizi. Nasi memberi energi, sedangkan telur, sayur, dan buah memberi zat gizi berbeda.", "Kesehatan"],

  [9, "Budaya Literasi", "Sekolah perlu membangun kebiasaan membaca karena memahami informasi membantu siswa belajar. Setelah membaca buku, siswa dapat menceritakan kembali isinya dengan kata-kata sendiri.", "Membaca"],
  [9, "Sekolah Bebas Sampah", "Kebersihan sekolah adalah tanggung jawab bersama. Membawa tempat minum, membuang sampah dengan benar, dan menjalankan piket membantu menjaga sekolah tetap bersih.", "Kebersihan"],
  [9, "Adil kepada Semua", "Semua teman perlu mendapat kesempatan bermain agar merasa diterima. Saat bermain kelompok, kita bisa bergiliran memilih anggota supaya tidak ada yang selalu tersisih.", "Persahabatan"],
  [9, "Menjaga Sumber Air", "Sumber air harus dijaga karena manusia, hewan, dan tumbuhan memerlukan air bersih. Sampah di sungai dapat mencemari air, sehingga sampah perlu dibuang pada tempatnya.", "Lingkungan"],
  [9, "Hidup Seimbang", "Kesehatan tidak cukup dijaga dengan olahraga saja. Tubuh juga membutuhkan makanan bergizi, tidur cukup, dan kebersihan diri agar kita dapat beraktivitas dengan baik.", "Kesehatan"]
];

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function createDeck(owner) {
  return shuffle(catalog.map((item, index) => ({
    id: `${owner}-${index}`,
    power: item[0],
    title: item[1],
    text: item[2],
    topic: item[3]
  })));
}

function say(message) {
  $("#log").textContent = message;
}

function counts() {
  const p = cells.filter(cell => cell.owner === "p").length;
  const r = cells.filter(cell => cell.owner === "r").length;

  $("#ps").textContent = `${p} petak`;
  $("#rs").textContent = `${r} petak`;

  return { p, r };
}

function drawHand(owner) {
  const deck = owner === "p" ? playerDeck : rivalDeck;
  const current = owner === "p" ? hand : rhand;

  while (current.length < 5 && deck.length > 0) {
    current.push(deck.shift());
  }
}

function hasLegalMove(owner) {
  const currentHand = owner === "p" ? hand : rhand;

  if (currentHand.length === 0) return false;

  return cells.some(cell =>
    cell.owner === null ||
    cell.owner === (owner === "p" ? "r" : "p")
  );
}

function finishIfNeeded() {
  const playerCanMove = hasLegalMove("p");
  const rivalCanMove = hasLegalMove("r");

  const allCardsUsed =
    hand.length === 0 &&
    rhand.length === 0 &&
    playerDeck.length === 0 &&
    rivalDeck.length === 0;

  if (allCardsUsed || (!playerCanMove && !rivalCanMove)) {
    end();
    return true;
  }

  return false;
}

function render() {
  const board = $("#board");
  board.innerHTML = "";

  cells.forEach((cell, index) => {
    const button = document.createElement("button");
    button.className = "cell" +
      (cell.owner === "p" ? " player" :
       cell.owner === "r" ? " rival" : "");

    button.disabled =
      !playerTurn || done || selected === null ||
      cell.owner === "p";

    if (cell.owner) {
      button.innerHTML = `
        <span class="ct">KEKUATAN ${cell.card.power}</span>
        <strong class="ctitle">${cell.card.title}</strong>
        <span class="ctext">${cell.card.text}</span>
        <span class="owner">${cell.owner === "p" ? "KAMU" : "RAKA"}</span>
      `;
    } else {
      button.innerHTML = `
        <small>PETAK ${String(index + 1).padStart(2, "0")}</small>
        <span class="ct">KOSONG</span>
      `;
    }

    button.onclick = () => play(index);
    board.appendChild(button);
  });

  const area = $("#hand");
  area.innerHTML = "";

  hand.forEach((card, index) => {
    const button = document.createElement("button");
    button.className = "card" +
      (selected === index ? " sel" : "");
    button.disabled = !playerTurn || done;

    button.innerHTML = `
      <span class="badge">${card.topic.toUpperCase()}</span>
      <span class="symbol">${card.power}</span>
      <strong>${card.title}</strong>
      <p>${card.text}</p>
      <span class="power">KEKUATAN ${card.power}/9</span>
    `;

    button.onclick = () => {
      selected = selected === index ? null : index;
      $("#hint").textContent = selected === null
        ? "Pilih kartu untuk memulai."
        : `Kartu "${card.title}" berkekuatan ${card.power}. Pilih petak kosong atau kartu Raka untuk diserang.`;
      render();
    };

    area.appendChild(button);
  });

  counts();
  $("#round").textContent = round;
}

function play(index) {
  if (selected === null || !playerTurn || done) return;

  const card = hand[selected];
  const target = cells[index];

  if (target.owner === "p") return;

  hand.splice(selected, 1);
  selected = null;

  if (!target.owner) {
    cells[index] = { owner: "p", card };
    say(`Kamu menempatkan "${card.title}" dengan kekuatan ${card.power}.`);
  } else if (card.power > target.card.power) {
    say(`Berhasil! "${target.card.title}" milik Raka dikalahkan.`);
    cells[index] = { owner: "p", card };
  } else if (card.power < target.card.power) {
    say(`Serangan gagal. "${card.title}" dibuang; kartu Raka tetap bertahan.`);
  } else {
    say("Kekuatan sama! Kedua kartu dibuang dan petak menjadi kosong.");
    cells[index] = { owner: null, card: null };
  }

  playerTurn = false;
  render();

  if (finishIfNeeded()) return;

  $("#turn").textContent = "GILIRAN RAKA";
  $("#hint").textContent = "Raka sedang menyusun langkah...";
  setTimeout(rivalMove, 500);
}

function rivalMove() {
  if (done) return;

  drawHand("r");

  const moves = [];

  rhand.forEach((card, handIndex) => {
    cells.forEach((cell, targetIndex) => {
      if (cell.owner === "r") return;

      let score = Math.random() * 3;

      if (!cell.owner) {
        score += card.power * 1.5;
      } else if (card.power > cell.card.power) {
        score += 12 + card.power - cell.card.power;
      } else if (card.power === cell.card.power) {
        score += 2;
      } else {
        score -= cell.card.power - card.power;
      }

      moves.push({
        card,
        handIndex,
        targetIndex,
        score
      });
    });
  });

  if (moves.length === 0) {
    drawHand("p");
    drawHand("r");

    if (finishIfNeeded()) return;

    playerTurn = true;
    $("#turn").textContent = "GILIRANMU";
    $("#hint").textContent =
      "Raka tidak memiliki langkah yang sah. Pilih langkahmu.";
    render();
    return;
  }

  moves.sort((a, b) => b.score - a.score);

  const move = moves[0];
  const card = move.card;
  const target = cells[move.targetIndex];

  rhand.splice(move.handIndex, 1);

  if (!target.owner) {
    cells[move.targetIndex] = { owner: "r", card };
    say(`Raka menempatkan "${card.title}" dengan kekuatan ${card.power}.`);
  } else if (card.power > target.card.power) {
    cells[move.targetIndex] = { owner: "r", card };
    say(`Raka mengalahkan "${target.card.title}" milikmu.`);
  } else if (card.power < target.card.power) {
    say(`Serangan Raka gagal. Kartu "${card.title}" dibuang.`);
  } else {
    cells[move.targetIndex] = { owner: null, card: null };
    say("Kekuatan sama! Kedua kartu dibuang.");
  }

  round++;
  drawHand("p");
  drawHand("r");

  if (finishIfNeeded()) return;

  playerTurn = true;
  $("#turn").textContent = "GILIRANMU";
  $("#hint").textContent = "Pilih kartu, lalu pilih petak.";
  render();
}

function end() {
  done = true;
  playerTurn = false;
  render();

  const { p, r } = counts();

  $("#mt").textContent = "HASIL PERTANDINGAN";
  $("#mh").textContent =
    p > r ? "Kamu memenangkan arena!" :
    p < r ? "Raka menguasai arena." :
    "Pertandingan berakhir seri!";

  $("#mb").textContent =
    `Kamu menguasai ${p} petak, sedangkan Raka ${r} petak.`;

  $("#ok").textContent = "Main lagi ↻";
  $("#modal").showModal();
  say("Pertandingan selesai.");
}

function start() {
  cells = Array.from({ length: 9 }, () => ({
    owner: null,
    card: null
  }));

  playerDeck = createDeck("p");
  rivalDeck = createDeck("r");

  hand = playerDeck.splice(0, 5);
  rhand = rivalDeck.splice(0, 5);

  selected = null;
  round = 1;
  playerTurn = true;
  done = false;

  $("#turn").textContent = "GILIRANMU";
  $("#hint").textContent = "Pilih kartu untuk memulai.";
  $("#mt").textContent = "PANDUAN SINGKAT";
  $("#mh").textContent = "Cara bermain";
  $("#mb").textContent =
    "Pilih kartu, lalu pilih petak kosong untuk menempatkannya atau petak Raka untuk menyerang. Kekuatan lebih tinggi menang. Jika lebih rendah, kartu penyerang dibuang. Jika sama, kedua kartu dibuang. Kartu yang kalah tidak kembali ke tangan.";
  $("#ok").textContent = "Mengerti";

  say("Pertandingan dimulai. Pilih kartu pertamamu.");
  render();
}

function showMenu() {
  $("#main-menu").hidden = false;
  $("#game-screen").hidden = true;
}

function showGame() {
  $("#main-menu").hidden = true;
  $("#game-screen").hidden = false;
}

$("#start-game").onclick = () => {
  showGame();
  start();
};

$("#open-tutorial").onclick = () => {
  $("#mt").textContent = "TUTORIAL";
  $("#mh").textContent = "Cara bermain";
  $("#mb").textContent =
    "Setiap pemain memiliki 5 kartu di tangan. Kekuatan kartu berkisar dari 1 sampai 9. Pilih kartu dan petak tujuan. Kartu yang lebih kuat mengalahkan kartu lawan; kartu yang kalah dibuang. Pemain dengan petak terbanyak saat permainan berakhir menang.";
  $("#ok").textContent = "Mengerti";
  $("#modal").showModal();
};

$("#open-settings").onclick = () => {
  $("#mt").textContent = "PENGATURAN";
  $("#mh").textContent = "Pengaturan permainan";
  $("#mb").textContent =
    "Pengaturan tambahan akan dikembangkan pada tahap berikutnya.";
  $("#ok").textContent = "Kembali";
  $("#modal").showModal();
};

$("#help").onclick = () => {
  $("#mt").textContent = "PANDUAN SINGKAT";
  $("#mh").textContent = "Menang dengan argumen";
  $("#mb").textContent =
    "Kekuatan kartu adalah nilai permainan, bukan ukuran kebenaran pendapat. Bacalah isi kartu dan pertimbangkan argumennya sebelum memilih langkah.";
  $("#ok").textContent = "Mengerti";
  $("#modal").showModal();
};

$("#read").onclick = () => {
  $("#mt").textContent = "TEKS PEMANTIK";
  $("#mh").textContent = "Membaca dan bermain";
  $("#mb").textContent =
    "Membaca dapat menambah pengetahuan. Bermain juga dapat melatih strategi, tetapi waktu perlu diatur. Sampaikan pendapat dengan alasan yang jelas, periksa informasi, dan dengarkan orang lain dengan sopan.";
  $("#ok").textContent = "Kembali ke permainan";
  $("#modal").showModal();
};

$("#x").onclick = () => $("#modal").close();

$("#ok").onclick = () => {
  const restart = $("#mt").textContent === "HASIL PERTANDINGAN";
  $("#modal").close();

  if (restart) start();
};

$("#restart").onclick = start;

$("#pass").onclick = () => {
  if (!playerTurn || done) return;

  selected = null;
  playerTurn = false;
  $("#turn").textContent = "GILIRAN RAKA";
  say("Kamu melewati giliran.");
  render();

  setTimeout(rivalMove, 350);
};

showMenu();
