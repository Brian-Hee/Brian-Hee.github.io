// 侧栏「关注我」按钮：点击弹出公众号「洛神赋」二维码（PC / 手机通用）
(function () {
  function buildModal() {
    var existing = document.getElementById('wechat-follow-modal');
    if (existing) return existing;
    var m = document.createElement('div');
    m.id = 'wechat-follow-modal';
    m.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:99999;justify-content:center;align-items:center;';
    m.innerHTML =
      '<div style="background:#fff;padding:24px;border-radius:12px;text-align:center;max-width:320px;width:88%;" onclick="event.stopPropagation()">' +
      '<h3 style="margin:0 0 14px;font-size:18px;font-weight:600;">微信扫码关注</h3>' +
      '<img src="/img/wechat-qrcode.jpg" alt="公众号洛神赋二维码" style="width:210px;border-radius:8px;display:block;margin:0 auto;">' +
      '<p style="margin:12px 0 0;color:#858585;font-size:14px;">公众号：洛神赋</p>' +
      '<button id="wechat-follow-close" style="margin-top:14px;padding:6px 22px;background:#f0f0f0;border:none;border-radius:4px;cursor:pointer;font-size:14px;">关闭</button>' +
      '</div>';
    document.body.appendChild(m);
    m.addEventListener('click', function () { m.style.display = 'none'; });
    m.querySelector('#wechat-follow-close').addEventListener('click', function () { m.style.display = 'none'; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') m.style.display = 'none'; });
    return m;
  }

  function bind() {
    var link = Array.from(document.querySelectorAll('.card-info a'))
      .find(function (a) { return a.innerText.indexOf('关注我') !== -1; });
    if (!link) return;
    // 阻止跳 GitHub，改为弹二维码
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var m = buildModal();
      m.style.display = 'flex';
    });
    var ic = link.querySelector('i');
    if (ic) ic.className = 'fab fa-weixin';
  }

  if (document.readyState !== 'loading') bind();
  else document.addEventListener('DOMContentLoaded', bind);
})();
