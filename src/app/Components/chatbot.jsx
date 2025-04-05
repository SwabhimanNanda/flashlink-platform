"use client"
import Script from 'next/script';

const Chatbot = () => {
  const handlerloader = () => {
    console.log('Script has finished loading');
  };
  const handleError = () => {
    console.log('Script has finished loading');
  };

  return (
    <Script id="chatbot-script" strategy="afterInteractive" onLoad={handlerloader} onError={handleError}>
      {`
        window.customTokens = {
          botId: "6450ad48ddccbe3a9081740f",
          appSecret: "963fcf9ef5e4dd2e6a9051357e1cdb69c9168c0e2e0f646b"
        };
        var script = document.createElement('script');
        script.src = "https://sthir.chatomate.in/webchat/v2/webChat.js";
        document.body.appendChild(script);
      `}
      
    </Script>
  );
};

export default Chatbot;
