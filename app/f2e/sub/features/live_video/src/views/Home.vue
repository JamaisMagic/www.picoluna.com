<template>
    <div class="home">
        <div class="video-wrapper">
            <div>Video</div>
            <video id="my_video" class="video-js vjs-default-skin" controls>
            </video>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import is_js from 'is_js';
    import videojs from 'video.js';
    // import 'videojs-flash';

    const mOptions = {
        techOrder: ['html5', 'flash'],
        autoplay: false,
        sources: [
            {
                type: 'application/x-mpegurl',
                src: 'http://8461.liveplay.myqcloud.com/live/8461_6c451633370bf9b646ea7abf5a36303d.m3u8'
            },
            {
                type: 'application/vnd.apple.mpegurl',
                src: 'http://8461.liveplay.myqcloud.com/live/8461_6c451633370bf9b646ea7abf5a36303d.m3u8'
            },
            {
                type: 'video/flv',
                src: 'http://8461.liveplay.myqcloud.com/live/8461_6c451633370bf9b646ea7abf5a36303d.flv'
            }
        ]
    };
    export default {
        name: 'home',
        data() {
            return {
                video: null
            };
        },
        components: {},
        created() {

        },
        async mounted() {
            await this.initVideo();
        },
        methods: {
            async initVideo() {
                if (is_js.desktop() && !(is_js.mac() && is_js.safari())) {
                    await import('videojs-flash');
                }

                this.video = videojs(document.querySelector('#my_video'), mOptions);
            },
            isProtocolEqual(url) {
                let a = document.createElement('a');
                a.href = url;

                return (location.protocol || 'https:') === a.protocol;
            },
            getUrlProtocol(url) {
                let a = document.createElement('a');
                a.href = url;
                return a.protocol;
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
