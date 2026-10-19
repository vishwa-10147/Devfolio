' Devfolio Launcher - Double-click to start
' This runs the development server in a hidden window initially,
' then shows the console for the server output.

Set objShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

' Get the directory where this script is located
scriptPath = objFSO.GetParentFolderName(WScript.ScriptFullName)
batFile = objFSO.BuildPath(scriptPath, "start-dev.bat")

' Check if batch file exists
If Not objFSO.FileExists(batFile) Then
    MsgBox "start-dev.bat not found in " & scriptPath, vbCritical, "Devfolio Launcher Error"
    WScript.Quit 1
End If

' Run the batch file in a new console window
objShell.Run "cmd /k """ & batFile & """", 1, False