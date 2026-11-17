<?php
return [
    'slug' => 'QR-Code-Decoder', 'title' => 'خواندن QR کد از تصویر', 'icon' => 'scan-line', 'cat' => 'media', 'mode' => 'client', 'order' => 85, 'libs' => ['jsqr.min.js'],
    'short' => 'دیکود QR کد از فایل تصویر', 'seo_title' => 'خواندن QR کد آنلاین از عکس (QR Decoder) | اینفو سئو',
    'intro' => 'تصویر QR کد را انتخاب کنید تا محتوای آن خوانده شود؛ تصویر شما آپلود نمی‌شود.',
    'desc' => 'QR Code Decoder رایگان: خواندن محتوای QR از فایل PNG/JPG/WebP در مرورگر، تشخیص لینک و بررسی ایمنی ظاهری آن قبل از باز کردن.',
    'ui' => static function (): string {
        return '<form data-tform novalidate><div class="field"><label for="f-qr">تصویر QR کد</label><input id="f-qr" name="img" type="file" accept="image/png,image/jpeg,image/webp,image/gif" required></div>'
            . '<div class="tform__act"><button class="btn btn--primary" type="submit"><span class="btn__l">خواندن QR</span></button></div></form>';
    },
    'about' => [
        'تصویر با Canvas به پیکسل‌ها تبدیل می‌شود و کتابخانه‌ی jsQR (که در همین مرورگر اجرا می‌شود) QR را می‌یابد و رمزگشایی می‌کند. هیچ تصویری به سرور ارسال نمی‌شود.',
        'اگر محتوا یک لینک باشد، آن را فقط نمایش می‌دهیم و خودکار باز نمی‌کنیم؛ پیش از باز کردن لینک‌های ناشناس دقت کنید (QR فیشینگ رایج است).',
    ],
    'steps' => [['تصویر را انتخاب کنید', 'فایل عکس یا اسکرین‌شات QR.'], ['خواندن را بزنید', 'محتوا استخراج می‌شود.'], ['محتوا را بررسی کنید', 'لینک‌ها را قبل از باز کردن ببینید.']],
    'faq' => [
        ['چرا QR خوانده نشد؟', 'تصویر ممکن است تار، کوچک یا بدون حاشیه‌ی سفید باشد.'],
        ['QR دوربین زنده؟', 'این ابزار فقط تصویر فایل را می‌خواند.'],
        ['لینک ناشناس امن است؟', 'نه لزوماً؛ ابتدا دامنه را بررسی کنید.'],
    ],
    'related' => ['QR-Code-Generator', 'URL-Encoder-Decoder', 'Google-Malware-Checker'],
];
