<template>
    <div class="home">
        <div class="video-wrapper">
            <div>Video</div>
            <video id="my_video" class="video-js vjs-default-skin" controls>
                <source src="http://8461.liveplay.myqcloud.com/live/8461_3e6b5da8398cd0c7870e984a1fe19832.m3u8" type="application/x-mpegurl">
                <source src="http://8461.liveplay.myqcloud.com/live/8461_3e6b5da8398cd0c7870e984a1fe19832.m3u8" type="application/vnd.apple.mpegurl">
                <source src="http://8461.liveplay.myqcloud.com/live/8461_3e6b5da8398cd0c7870e984a1fe19832.flv" type="video/flv">
            </video>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import is_js from 'is_js';
    // import videojs from 'video.js';
    // import 'video.js/dist/video-js.css';

    // import 'videojs-flash';
    let videojs = null;


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
            videojs = await import('video.js');
            let options = null;
            if (is_js.android() || is_js.ios() || (is_js.mac() && !is_js.chrome())) {
                options = {
                    techOrder: ['html5'],
                    html5: {
                        hls: {

                        }
                    },
                    sources: [
                        {
                            type: 'application/x-mpegurl',
                            src: 'http://8461.liveplay.myqcloud.com/live/8461_3e6b5da8398cd0c7870e984a1fe19832.m3u8'
                        }
                    ]
                };
            } else {
                videojs = await import('video.js');
                await import('videojs-flash');
                options = {
                    techOrder: ['flash', 'html5'],
                    autoplay: false,
                    // flash: {
                    //     swf
                    // },
                    sources: [
                        {
                            type: 'video/flv',
                            src: 'http://8461.liveplay.myqcloud.com/live/8461_3e6b5da8398cd0c7870e984a1fe19832.flv'
                        },
                        {
                            type: 'application/x-mpegurl',
                            src: 'http://8461.liveplay.myqcloud.com/live/8461_3e6b5da8398cd0c7870e984a1fe19832.m3u8'
                        }
                    ]
                };
            }

            this.video = videojs.default(document.querySelector('#my_video'), options);
        }
    }
</script>
<style lang="scss" scoped>

</style>
