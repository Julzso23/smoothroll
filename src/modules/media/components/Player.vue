<template>
  <div class="embed-responsive embed-responsive-16by9 mb-3">
    <div id="player" class="embed-responsive-item"></div>
  </div>
</template>

<script>
  import Clappr from 'clappr';
  import LevelSelector from 'level-selector';
  import 'clappr/dist/38861cba61c66739c1452c3a71e39852.ttf';

  export default {
    name: 'player',
    props: {
      streamData: Object
    },
    watch: {
      streamData: function(value) {
        let player = new Clappr.Player({
          source: value.streams[0].url,
          parentId: '#player',
          plugins: [LevelSelector],
          width: '100%',
          height: '100%',
          levelSelectorConfig: {
            title: 'Quality',
            labels: {
              4: '1080p',
              3: '720p',
              2: '480p',
              1: '360p',
              0: '240p'
            }
          }
        });
      }
    }
  }
</script>
