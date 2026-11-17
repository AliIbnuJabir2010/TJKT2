// ---------- Splash ----------
  function hideSplash(){
    var splash = document.getElementById('splash');
    if(!splash) return;
    splash.classList.add('hide');
    document.body.classList.remove('locked');
    setTimeout(function(){ if(splash.parentNode) splash.remove(); }, 900);
  }
  setTimeout(hideSplash, 3999);

  // ---------- Data siswa (dari Daftar Hadir Harian, TEKOMINFO 2, Semester Ganjil 2026/2027) ----------
  var students = [
    {no:1,  nisn:"0107687711", name:"Ali Ibnu Jabir", gender:"L", jabatan:"Developer"},
    {no:2,  nisn:"0118448948", name:"Abdi Djakkir Arrozzaq", gender:"L", jabatan:"Developer"},
    {no:3,  nisn:"0113160360", name:"Aldi Julian Pitra", gender:"L", jabatan:"Siswa"},
    {no:4,  nisn:"0118535277", name:"Amira", gender:"P", jabatan:"Wakil Sekretaris"},
    {no:5,  nisn:"0122256168", name:"Ardiansyah", gender:"L", jabatan:"Siswa"},
    {no:6,  nisn:"0114582051", name:"Dimas Prayoga", gender:"L", jabatan:"Siswa"},
    {no:7,  nisn:"0101813840", name:"Fikri Sahrul", gender:"L", jabatan:"Siswa"},
    {no:8,  nisn:"0096392468", name:"Gerald Pratama Putra", gender:"L", jabatan:"Siswa"},
    {no:9,  nisn:"3104865953", name:"Haikel Aldiano", gender:"L", jabatan:"Siswa"},
    {no:10, nisn:"0111429796", name:"Hairy Fatra Herdian", gender:"L", jabatan:"Siswa"},
    {no:11, nisn:"0119786511", name:"Irfan Rizky Wahyudi", gender:"L", jabatan:"Siswa"},
    {no:12, nisn:"0105886896", name:"Kasih Utami S.", gender:"P", jabatan:"Wakil Kebersihan"},
    {no:13, nisn:"0117321512", name:"M. Fatih Fawwaz Nurhadi", gender:"L", jabatan:"Siswa"},
    {no:14, nisn:"0114402871", name:"Marina Puri Abela", gender:"P", jabatan:"Wakil Bendahara"},
    {no:15, nisn:"0111746292", name:"Muhammad Alfian", gender:"L", jabatan:"Siswa"},
    {no:16, nisn:"0115332320", name:"Muhammad Alfin", gender:"L", jabatan:"Siswa"},
    {no:17, nisn:"0104570972", name:"Muhammad Choirul Ikhsan", gender:"L", jabatan:"Siswa"},
    {no:18, nisn:"0113737007", name:"Muhammad Dwi Prasetyo", gender:"L", jabatan:"Siswa"},
    {no:19, nisn:"0108546717", name:"Muhammad Nabil Adli", gender:"L", jabatan:"Siswa"},
    {no:20, nisn:"0109826972", name:"Muhammad Rafa Al Fahrisyi", gender:"L", jabatan:"Siswa"},
    {no:21, nisn:"0115013769", name:"Muhammad Rasyid", gender:"L", jabatan:"Siswa"},
    {no:22, nisn:"3107795836", name:"Muhammad Riski", gender:"L", jabatan:"Siswa"},
    {no:23, nisn:"0105346441", name:"Nadya Syafwa", gender:"P", jabatan:"Sekretaris"},
    {no:24, nisn:"0105558936", name:"Nesya Khandya Putri", gender:"P", jabatan:"Bendahara"},
    {no:25, nisn:"0112516821", name:"Nur Ghaniyyah Ruzqiyyah", gender:"P", jabatan:"Kebersihan"},
    {no:26, nisn:"0115353881", name:"Raiban Budiman", gender:"L", jabatan:"Keamanan"},
    {no:27, nisn:"0108772531", name:"Reynealdi Firmansyah Putra", gender:"L", jabatan:"Siswa"},
    {no:28, nisn:"0107239111", name:"Rifky Fatkhul Akmal", gender:"L", jabatan:"Wakil Ketua Kelas"},
    {no:29, nisn:"0115213721", name:"Riski Ramadon", gender:"L", jabatan:"Siswa"},
    {no:30, nisn:"0105809504", name:"Rizki Aditya", gender:"L", jabatan:"Siswa"},
    {no:31, nisn:"0115594391", name:"Rizky Saputra Dinata", gender:"L", jabatan:"Developer"},
    {no:32, nisn:"0112685994", name:"Syahdat Harfan", gender:"L", jabatan:"Siswa"},
    {no:33, nisn:"0103189936", name:"Yasir Putra Pratama", gender:"L", jabatan:"Ketua Kelas"}
  ];

  var activeFilter = "ALL";
  var searchTerm = "";

  function initials(name){
    var parts = name.trim().split(/\s+/);
    var a = parts[0] ? parts[0][0] : "";
    var b = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (a + b).toUpperCase();
  }

  // ---------- Detail profil siswa ----------
  function openDetail(nisn){
    var s = students.find(function(x){ return x.nisn === nisn; });
    if(!s) return;

    var fallback = initials(s.name);
    document.getElementById('detailPhoto').innerHTML =
      '<img src="foto/fotosiswa' + s.no + '.jpg" alt="Foto ' + s.name + '" onerror="this.parentElement.textContent=\'' + fallback + '\';">';
    document.getElementById('detailName').textContent = s.name;
    document.getElementById('detailSub').textContent = 'X TJKT 2 · Program Teknik Jaringan Komputer dan Telekomunikasi';
    document.getElementById('detailNo').textContent = String(s.no).padStart(2, '0');
    document.getElementById('detailNisn').textContent = s.nisn;
    document.getElementById('detailGender').textContent = s.gender === 'L' ? 'Laki-laki' : 'Perempuan';
    document.getElementById('detailJabatan').textContent = s.jabatan;

    var view = document.getElementById('detailView');
    view.classList.add('show');
    view.scrollTop = 0;
    window.scrollTo(0, 0);
    document.body.classList.add('locked');

    // paksa reflow supaya transisi fade+slide benar-benar jalan
    void view.offsetWidth;
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        view.classList.add('in');
      });
    });
  }

  function closeDetail(){
    var view = document.getElementById('detailView');
    view.classList.remove('in');
    document.body.classList.remove('locked');
    setTimeout(function(){
      view.classList.remove('show');
    }, 420); // samakan dengan durasi transisi opacity .detail-view
  }

  document.getElementById('rosterBody').addEventListener('click', function(e){
    var card = e.target.closest('.card');
    if(card) openDetail(card.getAttribute('data-nisn'));
  });

  function render(){
    var body = document.getElementById('rosterBody');
    var q = searchTerm.trim().toLowerCase();
    var filtered = students.filter(function(s){
      var matchGender = activeFilter === "ALL" || s.gender === activeFilter;
      var matchSearch = !q || s.name.toLowerCase().indexOf(q) !== -1 || s.nisn.indexOf(q) !== -1;
      return matchGender && matchSearch;
    });

    if(filtered.length === 0){
      body.innerHTML = '<div class="empty">Tidak ada siswa yang cocok dengan pencarian ini.</div>';
      return;
    }

    body.innerHTML = filtered.map(function(s, i){
      var fallback = initials(s.name);
      var delay = Math.min(i * 0.035, 0.5);
      return '' +
        '<div class="card" data-nisn="' + s.nisn + '" style="animation-delay:' + delay + 's">' +
          '<div class="photo" data-fallback="' + fallback + '">' +
            '<img src="foto/fotosiswa' + s.no + '.jpg" alt="Foto ' + s.name + '" onerror="this.parentElement.textContent=this.parentElement.dataset.fallback;">' +
          '</div>' +
          '<div class="card-body">' +
            '<div class="no">' + String(s.no).padStart(2,'0') + '</div>' +
            '<div class="card-name">' + s.name + '</div>' +
            '<div class="card-nisn">' + s.nisn + '</div>' +
            '<div class="card-meta">' +
              '<span class="badge ' + s.gender + '">' + (s.gender === 'L' ? 'Laki-laki' : 'Perempuan') + '</span>' +
              '<span class="badge role">' + s.jabatan + '</span>' +
            '</div>' +
          '</div>' +
        '</div>';
    }).join('');
  }

  function updateStats(){
    var total = students.length;
    var l = students.filter(function(s){ return s.gender === 'L'; }).length;
    var p = students.filter(function(s){ return s.gender === 'P'; }).length;
    document.getElementById('statTotal').textContent = total;
    document.getElementById('statL').textContent = l;
    document.getElementById('statP').textContent = p;
  }

  // ---------- Foto bersama (slideshow geser, smooth) ----------
  var groupPhotos = ['foto/kelasbersama1.jpg', 'foto/kelasbersama2.jpg', 'foto/kelasbersama3.jpg', 'foto/kelasbersama4.jpg'];
  var groupPhotoIndex = 0;
  var showingA = true; // gambar A sedang tampil di depan

  function rotateGroupPhoto(){
    var imgA = document.getElementById('groupPhotoImgA');
    var imgB = document.getElementById('groupPhotoImgB');
    var fallback = document.getElementById('groupPhotoFallback');
    if(!imgA || !imgB) return;

    var visible = showingA ? imgA : imgB;
    var incoming = showingA ? imgB : imgA;

    groupPhotoIndex = (groupPhotoIndex + 1) % groupPhotos.length;
    incoming.onerror = function(){
      incoming.style.display = 'none';
      fallback.style.display = 'flex';
    };
    incoming.onload = function(){
      incoming.style.display = 'block';
      fallback.style.display = 'none';
    };
    incoming.src = groupPhotos[groupPhotoIndex];

    // posisikan incoming tanpa transisi dulu, lalu geser+fade keduanya bareng
    incoming.style.transition = 'none';
    incoming.classList.remove('gp-outgoing');
    incoming.classList.add('gp-incoming');
    void incoming.offsetWidth; // paksa reflow
    incoming.style.transition = '';

    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        visible.classList.add('gp-outgoing');
        incoming.classList.remove('gp-incoming');
      });
    });

    showingA = !showingA;
  }

  setInterval(rotateGroupPhoto, 5000);

  // ---------- Controls ----------
  document.getElementById('searchBox').addEventListener('input', function(e){
    searchTerm = e.target.value;
    render();
  });

  document.querySelectorAll('.filter-tab').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('.filter-tab').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-gender');
      render();
    });
  });

  updateStats();
  render();
