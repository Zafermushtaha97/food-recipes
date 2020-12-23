<template>
  <div class="particles">
    <div id="particles-js"></div>
  </div>
</template>

<script>
import 'particles.js'
export default {
  name: "particles",
  mounted() {
    this.initParticles()
  },
  methods: {
    initParticles() {
      window.particlesJS("particles-js",{
  "particles": {
    "number": {
      "value": 303,
      "density": {
        "enable": true,
        "value_area": 789.1476416322727
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "triangle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 6
      },
      "image": {
        "src": "",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.8658425128673823,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 85.26810729164124,
        "size_min": 10.557003759917487,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 112.2388442605866,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 600
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 250,
        "size": 0,
        "duration": 5.2785018799587435,
        "opacity": 0,
        "speed": 3
      },
      "repulse": {
        "distance": 584.6955928569685,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": false
})
    }
  }
};
</script>

<style scoped>
#particles-js {
  /* background-image: #122b44; */
  height: 380px;
  width: 100%;
 /* background-image: url(https://assets.website-files.com/59f5ae906a27c400013267f0/5d2d9d69b1d789deb64dbca7_Photo-2.jpg); */
    background-size: cover;
    background-position: center;
}
</style>