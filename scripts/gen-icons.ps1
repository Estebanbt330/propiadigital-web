Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$appDir = Join-Path $root "app"

$bg = [System.Drawing.ColorTranslator]::FromHtml("#1B4F72")
$fg = [System.Drawing.ColorTranslator]::FromHtml("#E8843A")

function New-IconBitmap {
    param([int]$Size)

    $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

    # Rounded square background
    $radius = [int]($Size * 0.22)
    $d = $radius * 2
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddArc(0, 0, $d, $d, 180, 90)
    $path.AddArc($Size - $d, 0, $d, $d, 270, 90)
    $path.AddArc($Size - $d, $Size - $d, $d, $d, 0, 90)
    $path.AddArc(0, $Size - $d, $d, $d, 90, 90)
    $path.CloseFigure()

    $brushBg = New-Object System.Drawing.SolidBrush($bg)
    $g.FillPath($brushBg, $path)

    # Letter "P" centered
    $brushFg = New-Object System.Drawing.SolidBrush($fg)
    $font = New-Object System.Drawing.Font("Georgia", [single]($Size * 0.62), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $sf = New-Object System.Drawing.StringFormat
    $sf.Alignment = [System.Drawing.StringAlignment]::Center
    $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
    # Slight upward nudge so the serif "P" looks optically centered
    $rect = New-Object System.Drawing.RectangleF(0, [single](-$Size * 0.04), [single]$Size, [single]$Size)
    $g.DrawString("P", $font, $brushFg, $rect, $sf)

    $g.Dispose()
    $brushBg.Dispose()
    $brushFg.Dispose()
    $font.Dispose()
    return $bmp
}

# icon.png 512x512
$icon = New-IconBitmap -Size 512
$icon.Save((Join-Path $appDir "icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output "icon.png 512x512 OK"

# apple-icon.png 180x180
$apple = New-IconBitmap -Size 180
$apple.Save((Join-Path $appDir "apple-icon.png"), [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output "apple-icon.png 180x180 OK"

# favicon.ico — wrap a 64x64 PNG into the ICO container (PNG-encoded ICO)
$fav = New-IconBitmap -Size 64
$ms = New-Object System.IO.MemoryStream
$fav.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
$pngBytes = $ms.ToArray()
$ms.Dispose()

$icoPath = Join-Path $appDir "favicon.ico"
$fs = New-Object System.IO.FileStream($icoPath, [System.IO.FileMode]::Create)
$bw = New-Object System.IO.BinaryWriter($fs)
# ICONDIR
$bw.Write([uint16]0)      # reserved
$bw.Write([uint16]1)      # type = icon
$bw.Write([uint16]1)      # count
# ICONDIRENTRY
$bw.Write([byte]64)       # width
$bw.Write([byte]64)       # height
$bw.Write([byte]0)        # color palette
$bw.Write([byte]0)        # reserved
$bw.Write([uint16]1)      # color planes
$bw.Write([uint16]32)     # bits per pixel
$bw.Write([uint32]$pngBytes.Length)  # size of image data
$bw.Write([uint32]22)     # offset (6 + 16)
$bw.Write($pngBytes)
$bw.Flush()
$bw.Dispose()
$fs.Dispose()
Write-Output "favicon.ico 64x64 OK"

$icon.Dispose()
$apple.Dispose()
$fav.Dispose()
