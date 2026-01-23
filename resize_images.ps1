Add-Type -AssemblyName System.Drawing

$sourceDir = "c:\Users\nacho\OneDrive\Desktop\Nueva carpeta (3)\punto-electro\public\Toolbox"
$width = 1920
$height = 1080

Write-Host "Starting batch resize to 1920x1080..."

$files = Get-ChildItem -Path $sourceDir -Filter "frame_*.jpg"

foreach ($file in $files) {
    try {
        $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
        $ms = New-Object System.IO.MemoryStream(,$bytes)
        $img = [System.Drawing.Image]::FromStream($ms)

        $res = New-Object System.Drawing.Bitmap($width, $height)
        $graph = [System.Drawing.Graphics]::FromImage($res)
        
        # Simplified logic: Only set InterpolationMode which is critical
        $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

        $graph.DrawImage($img, 0, 0, $width, $height)
        
        $img.Dispose()
        $ms.Dispose()

        $res.Save($file.FullName, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        
        $res.Dispose()
        $graph.Dispose()
        
        Write-Host "Resized: $($file.Name)"
    }
    catch {
        Write-Error "Failed to resize $($file.Name): $_"
    }
}

Write-Host "Batch resize complete."
