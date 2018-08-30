<template>
    <div class="home">
        <div class="video-wrapper">
            <video id="my_video" controls>
                <source src="http://8461.liveplay.myqcloud.com/live/8461_c656997d03918061e8a55dc675f794d9.m3u8" type="application/x-mpegurl">
                <source src="http://8461.liveplay.myqcloud.com/live/8461_c656997d03918061e8a55dc675f794d9.m3u8" type="application/vnd.apple.mpegurl">
                <source src="http://8461.liveplay.myqcloud.com/live/8461_c656997d03918061e8a55dc675f794d9.flv" type="video/flv">
            </video>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import is_js from 'is_js';
    import videojs from 'video.js';

    // import 'videojs-flash';


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
            let options = null;
            if (is_js.android() || is_js.ios() || (is_js.mac() && !is_js.chrome())) {
                options = {
                    techOrder: ['html5'],
                    sources: [
                        {
                            type: 'application/x-mpegurl',
                            src: 'http://8461.liveplay.myqcloud.com/live/8461_c656997d03918061e8a55dc675f794d9.m3u8'
                        }
                    ]
                };
            } else {
                let swf = await import('videojs-flash');
                options = {
                    techOrder: ['flash', 'html5'],
                    autoplay: false,
                    flash: {
                        swf
                    },
                    sources: [
                        {
                            type: 'video/flv',
                            src: 'http://8461.liveplay.myqcloud.com/live/8461_c656997d03918061e8a55dc675f794d9.flv'
                        },
                        {
                            type: 'application/x-mpegurl',
                            src: 'http://8461.liveplay.myqcloud.com/live/8461_c656997d03918061e8a55dc675f794d9.m3u8'
                        }
                    ]
                };
            }

            this.video = videojs(document.querySelector('#my_video'), options);
        }
    }
</script>
<style lang="scss" scoped>

</style>
