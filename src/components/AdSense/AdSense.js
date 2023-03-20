import React, { useEffect } from 'react';

export const AdSense = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9889741061727429";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9889741061727429"
         crossorigin="anonymous"></script>
      <ins class="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-9889741061727429"
         data-ad-slot="6978185708"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>
  );
};


