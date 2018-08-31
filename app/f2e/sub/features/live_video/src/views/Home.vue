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

    const urlM3u8 = 'http://8461.liveplay.myqcloud.com/live/8461_6aec5f775926fcf27a01c71d17500af9.m3u8';
    const urlFlv = 'http://8461.liveplay.myqcloud.com/live/8461_6aec5f775926fcf27a01c71d17500af9.flv';

    const mOptions = {
        techOrder: ['flash', 'html5'],
        autoplay: false,
        flash: {},
        sources: [
            {
                type: 'video/flv',
                src: urlFlv
            },
            {
                type: 'application/x-mpegurl',
                src: urlM3u8
            },
            {
                type: 'application/vnd.apple.mpegurl',
                src: urlM3u8
            },
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
                    mOptions.flash.swf = `${process.env.BASE_URL}swf/video-js.swf`;
                    // mOptions.techOrder = ['flash', 'html5'];
                    // mOptions.sources.unshift(mOptions.sources.pop());
                } else {
                    // mOptions.techOrder = ['html5', 'flash'];
                }

                console.log('useFlv', useFlv);
                console.log('mOptions', mOptions);

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
