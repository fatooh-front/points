import React, { lazy, Suspense } from 'react';

// import { SocialIconProps } from 'react-social-icons';

const SocialIcon = lazy(() => import('react-social-icons').then(module => ({ default: module.SocialIcon })));

interface IconWrapperProps {
  network: string;
  style: React.CSSProperties;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ network, style }) => (
  <Suspense fallback={<div style={style}></div>}>
    <SocialIcon style={style} network={network} />
  </Suspense>
);

const iconStyle: React.CSSProperties = { width: 25, height: 25 };

interface SocialMediaOption {
  value: string;
  label: React.ReactNode;
}

export const socialMediaOptions: SocialMediaOption[] = [
  { value: "facebook", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="facebook" /> <span>Facebook</span></div> },
  { value: "twitter", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="twitter" /> <span>Twitter</span></div> },
  { value: "linkedin", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="linkedin" /> <span>LinkedIn</span></div> },
  { value: "instagram", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="instagram" /> <span>Instagram</span></div> },
  { value: "youtube", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="youtube" /> <span>YouTube</span></div> },
  { value: "pinterest", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="pinterest" /> <span>Pinterest</span></div> },
  { value: "tiktok", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="tiktok" /> <span>TikTok</span></div> },
  { value: "github", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="github" /> <span>GitHub</span></div> },
  { value: "reddit", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="reddit" /> <span>Reddit</span></div> },
  { value: "tumblr", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="tumblr" /> <span>Tumblr</span></div> },
  { value: "flickr", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="flickr" /> <span>Flickr</span></div> },
  { value: "dribbble", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="dribbble" /> <span>Dribbble</span></div> },
  { value: "vimeo", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="vimeo" /> <span>Vimeo</span></div> },
  { value: "whatsapp", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="whatsapp" /> <span>WhatsApp</span></div> },
  { value: "snapchat", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="snapchat" /> <span>Snapchat</span></div> },
  { value: "rss", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="rss" /> <span>RSS</span></div> },
  { value: "email", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="email" /> <span>Email</span></div> },
  { value: "medium", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="medium" /> <span>Medium</span></div> },
  { value: "behance", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="behance" /> <span>Behance</span></div> },
  { value: "xing", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="xing" /> <span>Xing</span></div> },
  { value: "soundcloud", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="soundcloud" /> <span>SoundCloud</span></div> },
  { value: "spotify", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="spotify" /> <span>Spotify</span></div> },
  { value: "twitch", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="twitch" /> <span>Twitch</span></div> },
  { value: "vk", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="vk" /> <span>VK</span></div> },
  { value: "telegram", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="telegram" /> <span>Telegram</span></div> },
  { value: "codepen", label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="codepen" /> <span>CodePen</span></div> },
  { value: 'stackoverflow', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="stackoverflow" /> <span>Stackoverflow</span></div> },
  { value: 'x', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="x" /> <span>X</span></div> },
  { value: 'yelp', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="yelp" /> <span>Yelp</span></div> },
  { value: 'yandex', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="yandex" /> <span>Yandex</span></div> },
  { value: 'xiaohongshu', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="xiaohongshu" /> <span>Xiaohongshu</span></div> },
  { value: 'wechat', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="wechat" /> <span>Wechat</span></div> },
  { value: 'vsco', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="vsco" /> <span>Vsco</span></div> },
  { value: 'vine', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="vine" /> <span>Vine</span></div> },
  { value: 'vevo', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="vevo" /> <span>Vevo</span></div> },
  { value: 'upwork', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="upwork" /> <span>Upwork</span></div> },
  { value: 'threads', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="threads" /> <span>Threads</span></div> },
  { value: 'squarespace', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="squarespace" /> <span>Squarespace</span></div> },
  { value: 'spotify', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="spotify" /> <span>Spotify</span></div> },
  { value: 'smugmug', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="smugmug" /> <span>Smugmug</span></div> },
  { value: 'slack', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="slack" /> <span>Slack</span></div> },
  { value: 'rdio', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="rdio" /> <span>Rdio</span></div> },
  { value: 'ravelry', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="ravelry" /> <span>Ravelry</span></div> },
  { value: 'pixiv', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="pixiv" /> <span>Pixiv</span></div> },
  { value: 'patreon', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="patreon" /> <span>Patreon</span></div> },
  { value: 'opensea', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="opensea" /> <span>Opensea</span></div> },
  { value: 'misskey', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="misskey" /> <span>Misskey</span></div> },
  { value: 'meetup', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="meetup" /> <span>Meetup</span></div> },
  { value: 'matrix', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="matrix" /> <span>Matrix</span></div> },
  { value: 'mastodon', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="mastodon" /> <span>Mastodon</span></div> },
  { value: 'mailto', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="mailto" /> <span>Mailto</span></div> },
  { value: 'linktree', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="linktree" /> <span>Linktree</span></div> },
  { value: 'line.me', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="line.me" /> <span>Line.me</span></div> },
  { value: 'itunes', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="itunes" /> <span>Itunes</span></div> },
  { value: 'itch.io', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="itch.io" /> <span>Itch.io</span></div> },
  { value: 'groupme', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="groupme" /> <span>Groupme</span></div> },
  { value: 'google_play', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="google_play" /> <span>Google_play</span></div> },
  { value: 'google', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="google" /> <span>Google</span></div> },
  { value: 'gitlab', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="gitlab" /> <span>Gitlab</span></div> },
  { value: 'foursquare', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="foursquare" /> <span>Foursquare</span></div> },
  { value: 'fivehundredpix', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="fivehundredpix" /> <span>Fivehundredpix</span></div> },
  { value: 'dropbox', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="dropbox" /> <span>Dropbox</span></div> },
  { value: 'discord', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="discord" /> <span>Discord</span></div> },
  { value: 'developer.mozilla', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="developer.mozilla" /> <span>Developer.mozilla</span></div> },
  { value: 'codepen', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="codepen" /> <span>Codepen</span></div> },
  { value: 'clubhouse', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="clubhouse" /> <span>Clubhouse</span></div> },
  { value: 'bsky.app', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="bsky.app" /> <span>bsky.app</span></div> },
  { value: 'behance', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="behance" /> <span>Behance</span></div> },
  { value: 'bandsintown', label: <div className="flex items-center gap-2"><IconWrapper style={iconStyle} network="bandsintown" /> <span>Bandsintown</span></div> },
]