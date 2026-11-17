<?php
return [
    'slug' => 'display-html', 'title' => 'نمایش و اجرای کد HTML', 'icon' => 'code-xml', 'cat' => 'dev', 'mode' => 'client', 'order' => 42, 'csp' => ['frame-src' => ["'self'"]],
    'short' => 'ویرایشگر و پیش‌نمایش زنده‌ی HTML و CSS', 'seo_title' => 'نمایش کد HTML آنلاین با پیش‌نمایش زنده | اینفو سئو',
    'intro' => 'کد HTML و CSS را بنویسید و نتیجه را همان لحظه در یک محیط ایزوله ببینید.',
    'desc' => 'شبیه‌ساز و نمایشگر آنلاین کد HTML و CSS با پیش‌نمایش زنده در iframe ایزوله (sandbox)؛ بدون ارسال کد به سرور.',
    'ui' => static function (): string {
        return '<div class="field"><label for="f-code">کد HTML و CSS</label><textarea id="f-code" dir="ltr" rows="12" spellcheck="false">&lt;!doctype html&gt;
&lt;html lang="fa" dir="rtl"&gt;
&lt;head&gt;
&lt;style&gt;
  body{font-family:sans-serif;padding:16px}
  .card{max-width:320px;padding:16px;border-radius:12px;background:#eef2ff}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div class="card"&gt;
    &lt;h1&gt;سلام دنیا&lt;/h1&gt;
    &lt;p&gt;این یک پیش‌نمایش زنده است.&lt;/p&gt;
  &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</textarea></div>'
            . '<div class="tform__act" role="group" aria-label="عرض پیش‌نمایش"><button type="button" class="btn btn--ghost btn--sm" data-w="360">موبایل (۳۶۰)</button><button type="button" class="btn btn--ghost btn--sm" data-w="768">تبلت (۷۶۸)</button><button type="button" class="btn btn--ghost btn--sm" data-w="100%">کامل</button></div>'
            . '<h2 class="res-t" style="margin-top:16px">پیش‌نمایش</h2><div class="tscroll"><iframe id="f-prev" title="پیش‌نمایش کد" sandbox="" style="width:100%;height:360px;border:0;background:#fff;display:block"></iframe></div>';
    },
    'about' => [
        'کد شما در یک iframe با ویژگی sandbox نمایش داده می‌شود؛ یعنی از سایت جدا است و به کوکی‌ها یا داده‌های اینفو سئو دسترسی ندارد. به‌همین دلیل (و برای امنیت) اسکریپت‌ها در پیش‌نمایش اجرا نمی‌شوند و فقط ساختار HTML و استایل‌ها نمایش داده می‌شود.',
        'برای یادگیری و آزمایش سریع چینش‌ها، فلکس‌باکس و گرید CSS مناسب است. کد در مرورگر شما می‌ماند.',
    ],
    'steps' => [['کد را بنویسید', 'HTML و CSS (داخل تگ style) را در کادر وارد کنید.'], ['پیش‌نمایش را ببینید', 'خروجی با کمی تأخیر به‌روز می‌شود.'], ['اندازه را تغییر دهید', 'با دکمه‌های عرض، حالت موبایل و دسکتاپ را مقایسه کنید.']],
    'faq' => [
        ['چرا جاوااسکریپت اجرا نمی‌شود؟', 'برای حفظ امنیت سایت؛ پیش‌نمایش فقط HTML و CSS را اجرا می‌کند.'],
        ['کد من ذخیره می‌شود؟', 'خیر.'],
        ['تصویرهای خارجی دیده می‌شوند؟', 'بله، تصویرهای https نمایش داده می‌شوند.'],
    ],
    'related' => ['Code-Difference-Comparison-Tool', 'HTML-Compressor', 'CSS-Minifier', 'Webpage-Screen-Resolution-Simulator'],
];
