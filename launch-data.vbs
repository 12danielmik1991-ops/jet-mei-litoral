' Runs the availability poller with no console window flashing.
' Used by the TerminalKoverData scheduled task (every 5 minutes).
Set sh = CreateObject("WScript.Shell")
sh.Run "powershell.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass -File ""C:\Users\12dan\tools\terminal-kover\fetch-availability.ps1""", 0, False
