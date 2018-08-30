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

    const urlM3u8 = 'http://8461.liveplay.myqcloud.com/live/8461_6c451633370bf9b646ea7abf5a36303d.m3u8';
    const urlFlv = 'http://8461.liveplay.myqcloud.com/live/8461_6c451633370bf9b646ea7abf5a36303d.flv';

    const mOptions = {
        techOrder: ['html5', 'flash'],
        autoplay: false,
        sources: [
            {
                type: 'application/x-mpegurl',
                src: urlM3u8
            },
            {
                type: 'application/vnd.apple.mpegurl',
                src: urlM3u8
            },
            {
                type: 'video/flv',
                src: urlFlv
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
                let useFlv = is_js.desktop() && !(is_js.mac() && is_js.safari()) && !this.isProtocolEqualOrHttps(urlM3u8);
                if (useFlv) {
                    await import('videojs-flash');
                    mOptions.techOrder = ['flash', 'html5'];
                }

                this.video = videojs(document.querySelector('#my_video'), mOptions);
            },
            getUrlProtocol(url) {
                let a = document.createElement('a');
                a.href = url;
                return a.protocol;
            },
            isProtocolEqual(url) {
                return (location.protocol || 'https:') === this.getUrlProtocol(url);
            },
            isProtocolEqualOrHttps(url) {
                return this.getUrlProtocol(url) === 'https:' || this.isProtocolEqual(url);
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
