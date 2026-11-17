<?php
return [
    'slug' => 'Image-Optimizer', 'title' => 'کاهش حجم و تبدیل فرمت تصویر', 'icon' => 'image', 'cat' => 'media', 'mode' => 'client', 'order' => 82,
    'short' => 'فشرده‌سازی JPG/PNG/WebP در مرورگر', 'seo_title' => 'کاهش حجم عکس آنلاین و تبدیل به WebP بدون آپلود | اینفو سئو',
    'intro' => 'تصاویر را کم‌حجم کنید یا به WebP/JPEG تبدیل کنید؛ فایل‌ها هرگز آپلود نمی‌شوند.',
    'desc' => 'ابزار رایگان کاهش حجم عکس: تغییر کیفیت و اندازه، تبدیل به WebP و JPEG، مقایسه‌ی حجم قبل و بعد؛ همه‌چیز در مرورگر انجام می‌شود.',
    'ui' => static function (): string {
        return '<form data-tform novalidate><div class="field"><label for="f-files">تصاویر (JPG, PNG, WebP)</label><input id="f-files" name="files" type="file" accept="image/jpeg,image/png,image/webp" multiple required><small class="hint">حداکثر ۲۰ فایل، هر فایل تا ۲۵ مگابایت.</small></div>'
            . '<div class="row3"><div class="field"><label for="f-fmt">فرمت خروجی</label><select id="f-fmt" name="fmt"><option value="image/webp">WebP (پیشنهادی)</option><option value="image/jpeg">JPEG</option><option value="image/png">PNG (بدون افت کیفیت)</option></select></div>'
            . '<div class="field"><label for="f-q">کیفیت: <output id="f-qv">80</output>٪</label><input id="f-q" name="q" type="range" min="30" max="100" value="80"></div>'
            . '<div class="field"><label for="f-w">حداکثر عرض (پیکسل)</label><input id="f-w" name="maxw" type="number" inputmode="numeric" dir="ltr" value="1600" min="64" max="8000"></div></div>'
            . '<div class="tform__act"><button class="btn btn--primary" type="submit"><span class="btn__l">بهینه‌سازی</span></button></div></form>';
    },
    'about' => [
        'تصاویر بزرگ‌ترین بخش حجم اغلب صفحات هستند و مستقیماً روی LCP و Core Web Vitals اثر می‌گذارند. این ابزار با Canvas مرورگر تصویر را در اندازه و کیفیت دلخواه دوباره ذخیره می‌کند. WebP معمولاً حجم را نسبت به JPEG چشمگیر کم می‌کند.',
        'فایل‌ها هیچ‌جا ارسال نمی‌شوند. دقت کنید که اطلاعات EXIF (مثل مکان عکس) در خروجی حذف می‌شود و برای PNG ممکن است حجم خروجی بیشتر شود؛ در این صورت فایل اصلی را نگه دارید.',
    ],
    'steps' => [['تصاویر را انتخاب کنید', 'یک یا چند عکس را برگزینید.'], ['کیفیت و عرض را تنظیم کنید', 'برای وب معمولاً کیفیت ۷۵ تا ۸۵ و عرض حداکثر ۱۶۰۰ کافی است.'], ['دانلود کنید', 'نتیجه را دانلود و حجم را مقایسه کنید.']],
    'faq' => [
        ['آپلود می‌شود؟', 'خیر؛ پردازش با Canvas در مرورگر است.'],
        ['چرا حجم PNG بیشتر شد؟', 'PNG بدون افت است و برای عکس مناسب نیست؛ WebP یا JPEG را امتحان کنید.'],
        ['WebP در همه‌ی مرورگرها کار می‌کند؟', 'در همه‌ی مرورگرهای مدرن بله.'],
    ],
    'related' => ['Favicon-Generator-Tool', 'Page-Size-Checker', 'PageSpeedinsight'],
];
