const playList = document.querySelector('.songs')
const playBtn = document.querySelector('.control .play')
const pauseBtn = document.querySelector('.control .pause')
const author = document.querySelector('.display .current_song .author')
const audio = document.querySelector('.audio')
const cd = document.querySelector('.display .current_song .img')
const songName = document.querySelector('.display .current_song .name')
const progress = document.querySelector('.display_control .progress')
const volumeProgress = document.querySelector('.volume')

const nextBtn = document.querySelector('.control .next')
const prevBtn =document.querySelector('.control .prev')
const randomBtn = document.querySelector('.control .shuffle')
console.log(volumeProgress)

const musicApp = {
    currentIndex : 0,
    isRandom : false,
  songs: [
    {
      author: "Charlie Puth",
      name: "Attention",
      img: "authors/CharliePuth.jpg",
      music: "songs/Attention.mp3",
    },
    {
      author: "Charlie Puth",
      name: "Light Switch",
      img: "authors/CharliePuth.jpg",
      music: "songs/LightSwitch.mp3",
    },
    {
      author: "Yim Jae Bum",
      name: "Stigma",
      img: "authors/ImJaeBum.jpg",
      music: "songs/Stigma.mp3",
    },
    {
      author: "Masew",
      name: "Mộng Mơ",
      img: "authors/Masew.jpg",
      music: "songs/MongMo.mp3",
    },
    {
      author: "Phong Max",
      name: "Lừa Tình",
      img: "authors/PhongMax.jpg",
      music: "songs/LuaTinh.mp3",
    },
    {
      author: "Lân Nhã",
      name: "Cơn Mơ Băng Giá",
      img: "./authors/LanNha.jpg",
      music: "./songs/conMoBangGia.mp3",
    },
    {
      author: "Phong Max",
      name: "Ngây Thơ",
      img: "./authors/PhongMax.jpg",
      music: "songs/NgayTho.mp3",
    },
  ],

  renderSongs: function () {
    const htmls = this.songs.map((song,index) => {
      return `
            
            <div class="song_obj" data-index="${index}" >

                <div class="img" style="background: url('${song.img}') center/cover no-repeat ">
                </div>

                <div class="play_btn"><i class="fa-solid fa-play"></i>
                </div>

                <div class="description">
                    <div class="song_name">${song.name}</div>
                    <div class="author">${song.author}</div>
                </div>

            </div>
            
            
            `
    });
    playList.innerHTML = htmls.join('');
  },
  handleSong: function () {
    const _this = this
    playBtn.onclick = function() {
        audio.play()
        pauseBtn.classList.remove('none')
        playBtn.classList.add('none')
    }
    pauseBtn.onclick = function() {
        audio.pause()
        pauseBtn.classList.add('none')
        playBtn.classList.remove('none')
    }
    audio.ontimeupdate = function () {
        if(audio.duration) {
            const progressPercent =Math.floor(audio.currentTime / audio.duration *100 )
            progress.value = progressPercent
        }
    }
    progress.onchange = function(e) {
      const seekTime = audio.duration * e.target.value / 100
      audio.currentTime = seekTime
    }
    volumeProgress.onchange = function(e) {
      const change = audio.volume.duration * e.target.value / 100
      audio.volume = change
    }
    nextBtn.onclick = function() {
        _this.nextSong()
        audio.play()
        pauseBtn.classList.remove('none')
        playBtn.classList.add('none')
    }
    prevBtn.onclick = function() {
        _this.prevSong()
        audio.play()
        pauseBtn.classList.remove('none')
        playBtn.classList.add('none')
    }
    randomBtn.onclick = function() {
      _this.isRandom = !_this.isRandom
      randomBtn.classList.toggle('pink',_this.isRandom)
    }
    playList.onclick() = function () {
      _this.currentIndex = index
      _this.loadCurrentSong()
      audio.play()
      console.log(90)
    }
  },
  defineProperties: function () {
    Object.defineProperty(this,'currentSong',{
        get: function () {
            return this.songs[this.currentIndex]
        }
    })
  },
  loadCurrentSong: function () {
   
    songName.textContent = this.currentSong.name
    audio.src= this.currentSong.music
    author.textContent = this.currentSong.author
    cd.style.background = 'url(`${this.currentSong.img}`)'
  },
  playRandom: function () {
    let newIndex
    do{
      this.newIndex = Math.floor(Math.random() * this.songs.length)

    } while(this.newIndex === this.currentIndex) {

      this.currentIndex = newIndex
      this.loadCurrentSong()
    }
  },
  nextSong: function () {
    this.currentIndex++
    if(this.currentIndex >= this.songs.length) {
        this.currentIndex = 0
    }
    this.loadCurrentSong()
  },
  prevSong: function () {
    this.currentIndex--
    if(this.currentIndex < 0 ) {
        this.currentIndex = this.songs.length - 1
    } 
    this.loadCurrentSong()

  },
  startMusicApp: function () {
    this.renderSongs();
    this.defineProperties();
    this.loadCurrentSong()
    this.handleSong();
  },
};
musicApp.startMusicApp();



