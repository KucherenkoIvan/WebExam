import React from 'react';
import NowOnline from '../NowOnline/NowOnline';
import s from './styles.scss';

export default function Footer() {
  return (
    <div className="footer">
      <div>
        <a href="https://metrika.yandex.ru/stat/?id=77014948&amp;from=informer" target="_blank" rel="nofollow"><img src="https://informer.yandex.ru/informer/77014948/3_1_FFFFFFFF_EFEFEFFF_0_pageviews" style="width:88px; height:31px; border:0;" alt="Яндекс.Метрика" title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)" class="ym-advanced-informer" data-cid="77014948" data-lang="ru" /></a>
      </div>
      <NowOnline />
    </div>
  );
}
