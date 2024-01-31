// import classNames from 'classnames/bind';
// import { useEffect, useRef, useState } from 'react';
// import { ReactComponent as LikeIcon } from '../../../assets/icon/like.svg';
// import { ReactComponent as NextIcon } from '../../../assets/icon/next.svg';
// import { ReactComponent as PauseIcon } from '../../../assets/icon/pause.svg';
// import { ReactComponent as PlayIcon } from '../../../assets/icon/play.svg';
// import { ReactComponent as PreviousIcon } from '../../../assets/icon/previous.svg';
// import { ReactComponent as QueueIcon } from '../../../assets/icon/queue.svg';
// import { ReactComponent as RepeatIcon } from '../../../assets/icon/repeat.svg';
// import { ReactComponent as ShuffleIcon } from '../../../assets/icon/shuffle.svg';
// import { ReactComponent as VolumeIcon } from '../../../assets/icon/volume.svg';

// import { Playback, initialPlayback } from '../../../models/Playback';
// import { Queue, initialQueue } from '../../../models/Queue';
// import { Track } from '../../../models/Track';
// import createHlsPlayer, { HlsPlayer } from '../../../shared/utils/HlsUtil';
// import formatDurationSec from '../../../shared/utils/TimeUtil';
// import style from './AudioPlayer.module.scss';
// import { PLAYBACK_UPDATE_INTERVAL_MS } from '../../../shared/GlobalConstant';

// const css = classNames.bind(style);

// const mockQueue: Queue = {
//   isShuffled: false,
//   playedTracks: [
//     {
//       id: '9d2608d9-5db5-482a-8606-cfd883b0b6c4',
//       name: 'Nắng Ấm Xa Dần',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 191,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/504068deeffddaf2608038c4bf5ec636/504068deeffddaf2608038c4bf5ec636.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '384d4901-261a-4044-a19d-cbdb69c843c4',
//       name: 'Muộn Rồi Mà Sao Còn - Remix',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 446,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/fffa4bbfeb42e6d0d0997558424b795e/fffa4bbfeb42e6d0d0997558424b795e.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//         {
//           id: '29968bbb-3f30-4f53-bcbe-188e14372313',
//           name: 'BOMATELA',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: null,
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab67616d0000b27313d38e4353a8c3ae89fec15b',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '9587c10c-8bb6-46c9-b5a2-060447372139',
//       name: 'Muộn Rồi Mà Sao Còn',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 275,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/4bd81b8d690f2d21c3812273fbb31c07/4bd81b8d690f2d21c3812273fbb31c07.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '693cd583-4023-451e-9e76-36a7c6ab551c',
//       name: 'Có Chắc Yêu Là Đây - Remix',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 226,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/568c3d70d7957fb8f9ac0284e1a51b35/568c3d70d7957fb8f9ac0284e1a51b35.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//         {
//           id: '29968bbb-3f30-4f53-bcbe-188e14372313',
//           name: 'BOMATELA',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: null,
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab67616d0000b27313d38e4353a8c3ae89fec15b',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'b9e8b26f-28b9-4d19-b8a8-bd877ba747b9',
//       name: 'Nơi Này Có Anh',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 260,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/189c8e3c3a2c281abcd79687bcf59bf5/189c8e3c3a2c281abcd79687bcf59bf5.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '2c9964e7-eb3b-4fa6-a782-72941e472e08',
//       name: 'Có Chắc Yêu Là Đây',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 202,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/d94305b5141a0421a4a691eefdab5e05/d94305b5141a0421a4a691eefdab5e05.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'a2474958-2f59-4beb-a0be-50b9000ae4e2',
//       name: 'Chắc Ai Đó Sẽ Về - Sky Tour 2019',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 283,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/d19eb87ded7be4c6e6c6c928f8748141/d19eb87ded7be4c6e6c6c928f8748141.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '66037e55-ebe6-426b-b25e-d22e34329c2f',
//       name: 'Có Chắc Yêu Là Đây - Onionn Remix countdown 2021',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 230,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/2f386e40e390356c071b06852fb4b540/2f386e40e390356c071b06852fb4b540.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//         {
//           id: '59d74f9d-51f5-40e1-911d-e7c905f6211b',
//           name: 'Onionn.',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb78acc69f189aa5dc006e92f1',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '27dc3a4b-1839-4ddf-91cf-e18e0838e38a',
//       name: "There's No One At All (Another Version)",
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 201,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/f5dc4a93adf0f64e0f51094d8281535d/f5dc4a93adf0f64e0f51094d8281535d.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'c855f8e6-ee38-4d18-a09f-fd6422e7c192',
//       name: 'Cơn Mưa Ngang Qua',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 234,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/5d0225fecf4324b5351e8d7869073aea/5d0225fecf4324b5351e8d7869073aea.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '05bee14f-d6d8-45b6-8a25-c800239578cd',
//       name: 'Remember Me - SlimV Remix',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 201,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/e25b217428c69d3b3dda3df88dfdbb4d/e25b217428c69d3b3dda3df88dfdbb4d.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//         {
//           id: 'aaa310fa-2f24-4bbd-a22a-46b34fb9e211',
//           name: 'SlimV',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: null,
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5ebc22a603a6c20b3030007fc27',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'c1b4e3de-106d-468f-a128-01b64acac086',
//       name: 'Em Của Ngày Hôm Qua',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 225,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/70f8e5bc433caf68b1e66400c6ebbdf6/70f8e5bc433caf68b1e66400c6ebbdf6.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '8518f688-3e93-4048-9229-a92b1c583dfa',
//       name: 'Nơi Này Có Anh - Remix',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 214,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/88f5760106996c52fa9d5395fede8051/88f5760106996c52fa9d5395fede8051.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//         {
//           id: '29968bbb-3f30-4f53-bcbe-188e14372313',
//           name: 'BOMATELA',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: null,
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab67616d0000b27313d38e4353a8c3ae89fec15b',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '03b23283-a573-4209-b76c-d215b47eaf51',
//       name: 'Remember Me - Onionn Remix Countdown 2021',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 197,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/3ae3c70dc181beadce82f2d1ed51e81f/3ae3c70dc181beadce82f2d1ed51e81f.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//         {
//           id: '59d74f9d-51f5-40e1-911d-e7c905f6211b',
//           name: 'Onionn.',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb78acc69f189aa5dc006e92f1',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'fda96939-c98a-4c65-8141-54454d55816b',
//       name: 'Chúng Ta Của Hiện Tại',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 301,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/4521da378dbcda32c2b2b39c73852943/4521da378dbcda32c2b2b39c73852943.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '38c0bbbf-2eb1-4ae2-b903-da31a5b05b79',
//       name: 'Một Năm Mới Bình An',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 247,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/bd018ed45d7708a8316c4ea31f932058/bd018ed45d7708a8316c4ea31f932058.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '9d2608d9-5db5-482a-8606-cfd883b0b6c4',
//       name: 'Nắng Ấm Xa Dần',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 191,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/504068deeffddaf2608038c4bf5ec636/504068deeffddaf2608038c4bf5ec636.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '520b4ca3-cdeb-4b9d-b26d-e208bfb82f8b',
//       name: 'Cơn Mưa Ngang Qua - Remix 2022',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 233,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/c4f63654a9cebe3895e4a1611cf4140a/c4f63654a9cebe3895e4a1611cf4140a.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'be2d1931-959b-4ced-8be2-418600a6c37e',
//       name: 'Âm Thầm Bên Em',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 293,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/0479137f3320d59c6f00c83d6e7c43a9/0479137f3320d59c6f00c83d6e7c43a9.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '99e3324d-7ba4-45ab-bf02-4d9efcc09e72',
//       name: 'Chắc Ai Đó Sẽ Về',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 262,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/57d3a7849350a9faa3e6274b704ddebb/57d3a7849350a9faa3e6274b704ddebb.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'b5c975c9-591f-4cc0-9df4-5a555dcfad53',
//       name: 'Em Của Ngày Hôm Qua - Sky Tour 2019',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 246,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/f6e0dea18e6dc603caa7c82b846740ef/f6e0dea18e6dc603caa7c82b846740ef.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '507c142f-0a51-459c-a861-1006e687af5f',
//       name: 'Chúng Ta Không Thuộc Về Nhau - Sky Tour 2019',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 247,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/5c51e9924a9468b2167acaa208f02a26/5c51e9924a9468b2167acaa208f02a26.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'fcd0b973-d0c7-4bac-a65f-85d084d69fcd',
//       name: 'Buông Đôi Tay Nhau Ra',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 227,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/6d512b86c547f9f1b2c528545788fb26/6d512b86c547f9f1b2c528545788fb26.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'e0c54178-483f-4f32-b9d4-e11ab8724cb5',
//       name: 'Remember Me - Sky Tour 2019',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 203,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/7f7dfc43e3442d3cfac50de5431f142d/7f7dfc43e3442d3cfac50de5431f142d.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//         {
//           id: 'aaa310fa-2f24-4bbd-a22a-46b34fb9e211',
//           name: 'SlimV',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: null,
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5ebc22a603a6c20b3030007fc27',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '3fb6f25a-96ae-40bc-9e91-8d1baa28cb91',
//       name: 'Cơn Mưa Xa Dần',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 196,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/30eb815711b5c3100b5f17e89a1c680f/30eb815711b5c3100b5f17e89a1c680f.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'b5dd458a-04f0-4528-9470-d4e71889eef8',
//       name: 'Nắng Ấm Ngang Qua',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 195,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/993cb3d9f3293f9bfd7a290ac095b735/993cb3d9f3293f9bfd7a290ac095b735.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'cffd2721-a895-4d33-b426-036c9d47eba3',
//       name: 'Nắng Ấm Ngang Qua',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 195,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/1bf642c4df2a4761e35ae5635323b767/1bf642c4df2a4761e35ae5635323b767.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '1bd2e521-acc3-4b99-bf5e-a1f7925d9531',
//       name: 'Không Phải Dạng Vừa Đâu',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 247,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/bc749ae5361c62ca83f1da4555f3e71c/bc749ae5361c62ca83f1da4555f3e71c.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'af73bea1-009e-499a-8583-0b64e37cd85f',
//       name: 'Sky Tour (Intro)',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 149,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/3350a0e14f7fff1915b177085991f3f3/3350a0e14f7fff1915b177085991f3f3.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'fb45be40-8680-4d5c-afce-5c6b532fe8c3',
//       name: 'Remember Me - Onionn Remix Countdown 2021',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 197,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/47e11b95ca4296a7ec3e37194f19c84f/47e11b95ca4296a7ec3e37194f19c84f.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//         {
//           id: '59d74f9d-51f5-40e1-911d-e7c905f6211b',
//           name: 'Onionn.',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb78acc69f189aa5dc006e92f1',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//   ],
//   tracks: [
//     {
//       id: '733b5318-af76-4958-8f14-15a445b8de8e',
//       name: 'Tiến Lên Việt Nam Ơi',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 218,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/7b6ebbae539224a29e48d8f3b128e516/7b6ebbae539224a29e48d8f3b128e516.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '3d1ab397-bff8-4b89-a14e-ae24d21a11c6',
//       name: 'Nắng Ấm Xa Dần - Onionn Remix',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 190,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/017bd1cc3d8f567779cc7ab1d61f6477/017bd1cc3d8f567779cc7ab1d61f6477.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//         {
//           id: '59d74f9d-51f5-40e1-911d-e7c905f6211b',
//           name: 'Onionn.',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb78acc69f189aa5dc006e92f1',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'b5848bf4-144f-4565-b7da-4cacfc66caae',
//       name: "THERE'S NO ONE AT ALL",
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 172,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/23ddf91c8c59884ff226b00b70191e49/23ddf91c8c59884ff226b00b70191e49.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'd4ad85e4-5a98-460b-9a76-de1d440b1e92',
//       name: 'Cơn Mưa Xa Dần',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 196,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/a70cc5ddc9ebbd60f0e59e0e9a4faacc/a70cc5ddc9ebbd60f0e59e0e9a4faacc.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'c0c85852-1d95-44f2-99a3-4006a61a8a58',
//       name: 'MAKING MY WAY',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 258,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/086b71c2b76c5f1c9a80ccf59d67fca5/086b71c2b76c5f1c9a80ccf59d67fca5.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'c6cefeb0-f8b5-43b1-a044-ba7b678df6db',
//       name: 'Lạc Trôi',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 232,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/bc90bae43cbadf2039a7b80ca67f8178/bc90bae43cbadf2039a7b80ca67f8178.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'c23bbe24-93de-4345-97bb-985741c2faf0',
//       name: 'Intro 2022',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 83,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/c81c651640233c86b96b5718075c7260/c81c651640233c86b96b5718075c7260.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'ab73e70f-c55a-4dcb-ac7b-eb0c1a84b400',
//       name: 'Ấn Nút Nhớ... Thả Giấc Mơ',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 244,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/1f89c90e2053a0ce1c822090365ec3a1/1f89c90e2053a0ce1c822090365ec3a1.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '04c79090-2c2b-451e-bb45-b6902d932849',
//       name: 'Skyler',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 134,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/b35343ddcf3c6f1e6ecfef98dd8dbdff/b35343ddcf3c6f1e6ecfef98dd8dbdff.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'd74e6df0-7e10-468d-8ec8-43a1890c65a2',
//       name: 'Chúng Ta Không Thuộc Về Nhau',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 233,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/fc95014c05e24a7715eb4c9f3bb22691/fc95014c05e24a7715eb4c9f3bb22691.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '11f9958b-70df-4601-93a8-d1a6e1b60a76',
//       name: 'Chạy Ngay Đi - Onionn Remix',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 230,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/acb6d65652d10eb3ae14f3c291ac248f/acb6d65652d10eb3ae14f3c291ac248f.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//         {
//           id: '59d74f9d-51f5-40e1-911d-e7c905f6211b',
//           name: 'Onionn.',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb78acc69f189aa5dc006e92f1',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '2defadb3-6328-42c5-ae60-c71c05ef16f7',
//       name: 'Anh Sai Rồi',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 252,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/3ce81e4fb13ca18cac88a1ecde15ee7a/3ce81e4fb13ca18cac88a1ecde15ee7a.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '29b49975-69e8-45dd-832e-8461a0f09e9f',
//       name: 'Lạc Trôi - Sky Tour 2019',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 293,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/ce3b8b18b167cab035bdac58208afee7/ce3b8b18b167cab035bdac58208afee7.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'f1edc526-822a-4fa5-8492-9595ccf7fafb',
//       name: 'Hãy Trao Cho Anh - Sky Tour 2019',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 253,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/efe19fd34dbe2d08d15c595e0818cd39/efe19fd34dbe2d08d15c595e0818cd39.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'b040da80-0538-4337-8305-8fad7daac630',
//       name: 'Special Thanks',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 80,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/4aba6786a1f332b2c98217accd1f8646/4aba6786a1f332b2c98217accd1f8646.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '421dc739-3b05-4cb8-8c9c-436a576261d4',
//       name: 'Thái Bình Mồ Hôi Rơi',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 318,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/fcd677350a020aff3d1542db06275fe7/fcd677350a020aff3d1542db06275fe7.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '6ca59f3f-a928-41fe-8f42-1aaf39f4720f',
//       name: 'Khuôn Mặt Đáng Thương',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 257,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/0eadd27d3acc9dfc79c0fc9d794300ad/0eadd27d3acc9dfc79c0fc9d794300ad.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '2fc602d8-0072-49ff-9900-d8dbb8508ef6',
//       name: 'CHẠY NGAY ĐI',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 272,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/43a3810a77b63525da6b90e553450fff/43a3810a77b63525da6b90e553450fff.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//         {
//           id: '59d74f9d-51f5-40e1-911d-e7c905f6211b',
//           name: 'Onionn.',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb78acc69f189aa5dc006e92f1',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '65a78742-5f2c-48f4-928a-f22e140dc515',
//       name: 'Chạy Ngay Đi - Sky Tour 2019',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 309,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/0cb106ec660f02898802acfe25da409f/0cb106ec660f02898802acfe25da409f.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '6ec99b95-d9de-4f97-a004-fa3fc40fcb81',
//       name: 'Hãy Trao Cho Anh',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 245,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/871c63ae4e7eecf7f5626c477503755e/871c63ae4e7eecf7f5626c477503755e.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//         {
//           id: 'e509c4c1-83d7-44f8-a67a-7e2ef818866c',
//           name: 'Snoop Dogg',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: null,
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb9a398209a4ef3360dce2dec4',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//   ],
//   originTracks: [
//     {
//       id: '733b5318-af76-4958-8f14-15a445b8de8e',
//       name: 'Tiến Lên Việt Nam Ơi',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 218,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/7b6ebbae539224a29e48d8f3b128e516/7b6ebbae539224a29e48d8f3b128e516.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '3d1ab397-bff8-4b89-a14e-ae24d21a11c6',
//       name: 'Nắng Ấm Xa Dần - Onionn Remix',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 190,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/017bd1cc3d8f567779cc7ab1d61f6477/017bd1cc3d8f567779cc7ab1d61f6477.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//         {
//           id: '59d74f9d-51f5-40e1-911d-e7c905f6211b',
//           name: 'Onionn.',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb78acc69f189aa5dc006e92f1',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'b5848bf4-144f-4565-b7da-4cacfc66caae',
//       name: "THERE'S NO ONE AT ALL",
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 172,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/23ddf91c8c59884ff226b00b70191e49/23ddf91c8c59884ff226b00b70191e49.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'd4ad85e4-5a98-460b-9a76-de1d440b1e92',
//       name: 'Cơn Mưa Xa Dần',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 196,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/a70cc5ddc9ebbd60f0e59e0e9a4faacc/a70cc5ddc9ebbd60f0e59e0e9a4faacc.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'c0c85852-1d95-44f2-99a3-4006a61a8a58',
//       name: 'MAKING MY WAY',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 258,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/086b71c2b76c5f1c9a80ccf59d67fca5/086b71c2b76c5f1c9a80ccf59d67fca5.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'c6cefeb0-f8b5-43b1-a044-ba7b678df6db',
//       name: 'Lạc Trôi',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 232,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/bc90bae43cbadf2039a7b80ca67f8178/bc90bae43cbadf2039a7b80ca67f8178.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'c23bbe24-93de-4345-97bb-985741c2faf0',
//       name: 'Intro 2022',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 83,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/c81c651640233c86b96b5718075c7260/c81c651640233c86b96b5718075c7260.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'ab73e70f-c55a-4dcb-ac7b-eb0c1a84b400',
//       name: 'Ấn Nút Nhớ... Thả Giấc Mơ',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 244,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/1f89c90e2053a0ce1c822090365ec3a1/1f89c90e2053a0ce1c822090365ec3a1.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '04c79090-2c2b-451e-bb45-b6902d932849',
//       name: 'Skyler',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 134,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/b35343ddcf3c6f1e6ecfef98dd8dbdff/b35343ddcf3c6f1e6ecfef98dd8dbdff.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'd74e6df0-7e10-468d-8ec8-43a1890c65a2',
//       name: 'Chúng Ta Không Thuộc Về Nhau',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 233,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/fc95014c05e24a7715eb4c9f3bb22691/fc95014c05e24a7715eb4c9f3bb22691.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '11f9958b-70df-4601-93a8-d1a6e1b60a76',
//       name: 'Chạy Ngay Đi - Onionn Remix',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 230,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/acb6d65652d10eb3ae14f3c291ac248f/acb6d65652d10eb3ae14f3c291ac248f.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//         {
//           id: '59d74f9d-51f5-40e1-911d-e7c905f6211b',
//           name: 'Onionn.',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb78acc69f189aa5dc006e92f1',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '2defadb3-6328-42c5-ae60-c71c05ef16f7',
//       name: 'Anh Sai Rồi',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 252,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/3ce81e4fb13ca18cac88a1ecde15ee7a/3ce81e4fb13ca18cac88a1ecde15ee7a.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '29b49975-69e8-45dd-832e-8461a0f09e9f',
//       name: 'Lạc Trôi - Sky Tour 2019',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 293,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/ce3b8b18b167cab035bdac58208afee7/ce3b8b18b167cab035bdac58208afee7.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'f1edc526-822a-4fa5-8492-9595ccf7fafb',
//       name: 'Hãy Trao Cho Anh - Sky Tour 2019',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 253,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/efe19fd34dbe2d08d15c595e0818cd39/efe19fd34dbe2d08d15c595e0818cd39.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: 'b040da80-0538-4337-8305-8fad7daac630',
//       name: 'Special Thanks',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 80,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/4aba6786a1f332b2c98217accd1f8646/4aba6786a1f332b2c98217accd1f8646.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '421dc739-3b05-4cb8-8c9c-436a576261d4',
//       name: 'Thái Bình Mồ Hôi Rơi',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 318,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/fcd677350a020aff3d1542db06275fe7/fcd677350a020aff3d1542db06275fe7.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '6ca59f3f-a928-41fe-8f42-1aaf39f4720f',
//       name: 'Khuôn Mặt Đáng Thương',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 257,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/0eadd27d3acc9dfc79c0fc9d794300ad/0eadd27d3acc9dfc79c0fc9d794300ad.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '2fc602d8-0072-49ff-9900-d8dbb8508ef6',
//       name: 'CHẠY NGAY ĐI',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 272,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/43a3810a77b63525da6b90e553450fff/43a3810a77b63525da6b90e553450fff.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//         {
//           id: '59d74f9d-51f5-40e1-911d-e7c905f6211b',
//           name: 'Onionn.',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb78acc69f189aa5dc006e92f1',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '65a78742-5f2c-48f4-928a-f22e140dc515',
//       name: 'Chạy Ngay Đi - Sky Tour 2019',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 309,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/0cb106ec660f02898802acfe25da409f/0cb106ec660f02898802acfe25da409f.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//     {
//       id: '6ec99b95-d9de-4f97-a004-fa3fc40fcb81',
//       name: 'Hãy Trao Cho Anh',
//       isPublic: true,
//       description: null,
//       releasedDate: null,
//       durationSec: 245,
//       thumbnail:
//         'https://raw.githubusercontent.com/vutiendat3601/cdn/_/img/aud/r000/871c63ae4e7eecf7f5626c477503755e/871c63ae4e7eecf7f5626c477503755e.jpg',
//       isPlayable: true,
//       artists: [
//         {
//           id: 'a6019fda-9d7e-44b7-8168-e6656471c200',
//           name: 'Sơn Tùng M-TP',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: 'vn',
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb51b32111f5bc456525313d89',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//         {
//           id: 'e509c4c1-83d7-44f8-a67a-7e2ef818866c',
//           name: 'Snoop Dogg',
//           realName: null,
//           birthDate: null,
//           description: null,
//           nationality: null,
//           biography: null,
//           thumbnail:
//             'https://i.scdn.co/image/ab6761610000e5eb9a398209a4ef3360dce2dec4',
//           backgroundImg: null,
//           isVerified: true,
//           isPublic: true,
//         },
//       ],
//     },
//   ],
//   repeatMode: 'none',
// };

// function AudioPlayer(): JSX.Element {
//   const [source, setSource] = useState<string>();
//   const queueRef = useRef<Queue>(initialQueue);
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const isUpdatedRef = useRef<boolean>();
//   const updateIdRef = useRef<ReturnType<typeof setTimeout>>();

//   const hlsPlayerRef = useRef<HlsPlayer>();
//   const [isPlaying, setPlaying] = useState<boolean>(false);
//   const [playback, setPlayback] = useState<Playback>(initialPlayback);
//   const [track, setTrack] = useState<Track>();

//   const audio = audioRef.current;
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (audio) {
//       hlsPlayerRef.current = createHlsPlayer('audioPlayer');
//     }
//   }, []);

//   useEffect(() => {
//     // const queue = queueRef.current;
//     async function loadQueue() {
//       // if (queue) {
//       // const resp = await fetch(
//       //   'http://bbapi.datvu.tech/v1/search?q=son%20tung&types=track&page=0&size=50'
//       // );
//       // const json = await resp.json();
//       // const data = json.data;
//       // const searchTrackResult = data.track;
//       // queue.tracks = searchTrackResult.items as Track[];

//       // }
//       queueRef.current = mockQueue;
//     }
//     loadQueue();
//   }, []);

//   useEffect(() => {
//     const audio = audioRef.current;
//     async function loadPlayback() {
//       clearTimeout(updateIdRef.current);
//       const playbackLocalStorage = localStorage.getItem('playback');
//       let playback: Playback | undefined;
//       if (playbackLocalStorage) {
//         playback = JSON.parse(playbackLocalStorage);
//       }
//       if (playback) {
//         setPlayback(playback);
//         const resp = await fetch(
//           `http://bbapi.datvu.tech/v1/tracks/${playback.trackId}`
//         );
//         const json = await resp.json();
//         const track: Track | undefined = json.data;
//         if (track) {
//           setTrack(track);
//         }
//       }
//     }
//     loadPlayback();
//   }, []);

//   useEffect(() => {
//     async function getStream() {
//       if (track) {
//         const resp = await fetch(
//           `http://bbapi.datvu.tech/v1/tracks/${track.id}/stream`
//         );
//         const json = await resp.json();
//         const data = json.data;
//         const streamLinks = data.links;
//         setSource(streamLinks['kbps128'][0]);
//         setPlayback((playback) => ({ ...playback, trackId: track.id }));
//       }
//     }
//     getStream();
//   }, [track]);

//   useEffect(() => {
//     const hlsPlayer = hlsPlayerRef.current;
//     if (hlsPlayer) {
//       hlsPlayer.loadSource(source);
//     }
//   }, [source]);

//   function handlePlayBtn() {
//     const audio = audioRef.current;
//     if (audio) {
//       isPlaying ? audio.pause() : audio.play();
//     }
//   }
//   function handleAudioLoadedMetadata() {
//     const audio = audioRef.current;
//     if (audio && playback) {
//       audio.currentTime = playback.currentSec;
//       setPlayback((playback) => ({
//         ...playback,
//         currentSec: audio.currentTime,
//       }));
//       if (isPlaying) {
//         audio.play();
//       }
//     }
//   }
//   function handleAudioTimeUpdate() {
//     const audio = audioRef.current;
//     if (audio && playback) {
//       if (isPlaying) {
//         setPlayback((playback) => ({
//           ...playback,
//           currentSec: audio.currentTime,
//         }));
//       }
//       // ## Save playback
//       if (!isUpdatedRef.current) {
//         isUpdatedRef.current = true;
//         localStorage.setItem(
//           'playback',
//           JSON.stringify({ ...playback, currentSec: audio.currentTime })
//         );
//         clearTimeout(updateIdRef.current);
//         updateIdRef.current = setTimeout(() => {
//           isUpdatedRef.current = false;
//         }, PLAYBACK_UPDATE_INTERVAL_MS);
//       }
//     }
//   }
//   function handleSeek(e: any) {
//     const audio = audioRef.current;
//     if (audio) {
//       audio.currentTime = e.target.value;
//     }
//   }
//   function next() {
//     const queue = queueRef.current;
//     if (queue) {
//       console.log(queue);
//       const nextTrack = queue.tracks.shift();
//       if (nextTrack) {
//         if (track) {
//           queue.playedTracks.push(track);
//         }
//         setTrack(nextTrack);
//       }
//     }
//   }

//   return (
//     <div className={css('audio-player')}>
//       <div className="row">
//         <div className="col-lg-4 col-md-12">
//           <div className={css('track')}>
//             <img
//               src={track?.thumbnail || ''}
//               alt={track?.name}
//               className={css('thumbnail')}
//             />
//             <div className={css('details')}>
//               <p>
//                 <a href="#!" className="text-link">
//                   {track?.name}
//                 </a>
//               </p>
//               <p>
//                 <a href="#!" className="text-link text-desc">
//                   Sơn Tùng M-TP
//                 </a>
//               </p>
//             </div>
//             <button className={css('like-btn')}>{<LikeIcon />}</button>
//           </div>
//         </div>
//         <div className="col-lg-4 col-md-12">
//           <div className={css('controls')}>
//             <div className={css('controls-top')}>
//               <button className={`${css('control')}`}>
//                 <ShuffleIcon />
//               </button>
//               <button className={`${css('control')}`}>
//                 <PreviousIcon />
//               </button>
//               <button
//                 className={css('control', 'play-control', {
//                   playing: isPlaying,
//                 })}
//                 onClick={handlePlayBtn}
//               >
//                 {isPlaying ? <PauseIcon /> : <PlayIcon />}
//               </button>
//               <button className={`${css('control')}`} onClick={() => next()}>
//                 <NextIcon />
//               </button>
//               <button className={`${css('control')}`}>
//                 <RepeatIcon />
//               </button>
//             </div>
//             <div className={css('controls-progressbar')}>
//               <p className={`text-label ${css('start-time')}`}>
//                 {audio
//                   ? formatDurationSec(Math.floor(audio.currentTime), false)
//                   : '0:00'}
//               </p>
//               <div
//                 className={css('progress')}
//                 style={
//                   {
//                     '--current-percent':
//                       audio && audio.duration
//                         ? `${(audio.currentTime / audio.duration) * 100}%`
//                         : `0`,
//                   } as React.CSSProperties
//                 }
//               >
//                 <input
//                   className={css('progress-seek')}
//                   type="range"
//                   min={0}
//                   max={audio && audio.duration ? audio.duration : 0}
//                   value={audio ? audio.currentTime : 0}
//                   onChange={handleSeek}
//                 />
//               </div>
//               <p className={`text-label ${css('end-time')}`}>
//                 {audio && audio.duration
//                   ? formatDurationSec(Math.floor(audio.duration), false)
//                   : '0:00'}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="col-lg-4 col-md-12">
//           <div className={css('action')}>
//             <div className="utils">
//               <button className={css('queue-btn')}>
//                 <QueueIcon />
//               </button>
//             </div>
//             <div className={css('volume')}>
//               <div className={css('icon')}>
//                 <VolumeIcon />
//               </div>
//               <input className={css('value')} type="range" min={0} max={100} />
//             </div>
//           </div>
//         </div>
//       </div>
//       <audio
//         id="audioPlayer"
//         ref={audioRef}
//         controls
//         preload="auto"
//         onLoadedMetadata={handleAudioLoadedMetadata}
//         onTimeUpdate={handleAudioTimeUpdate}
//         onPlay={() => setPlaying(true)}
//         onPause={() => setPlaying(false)}
//       ></audio>
//     </div>
//   );
// }
// export default AudioPlayer;
