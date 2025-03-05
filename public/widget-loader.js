(function () {
  const iframe = document.createElement("iframe");
  iframe.src = "https://chatbot-two-mu-42.vercel.app";
  iframe.width = "350";
  iframe.height = "500";
  iframe.style.border = "none";
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.zIndex = "1000";
  iframe.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
  iframe.style.borderRadius = "10px";

  document.body.appendChild(iframe);
})();
