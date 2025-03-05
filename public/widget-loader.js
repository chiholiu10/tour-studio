(function () {
  // Create a div to mount the widget
  const widgetDiv = document.createElement("div");
  widgetDiv.id = "chatbot-widget";
  document.body.appendChild(widgetDiv);

  // Load React Widget as an iframe
  const iframe = document.createElement("iframe");
  iframe.src = "https://chatbot-two-mu-42.vercel.app";
  iframe.width = "350";
  iframe.height = "500";
  iframe.style.border = "none";
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.zIndex = "1000";
  iframe.style.borderRadius = "10px";
  iframe.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

  widgetDiv.appendChild(iframe);
})();
