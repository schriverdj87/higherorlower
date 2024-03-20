import os

#David Schriver 2024-03-09

#1.Gather path names in directory indicated in look in and put the path names into filequeue if they are not there already.
#Users may manually pre-populate this list to enforce the order.

#2. For every entry in filequeue get the file and read it line-by-line. 
#a. If the line starts with "export class" replace that with class.
#b. If the line starts with "import {" skip it.
#c. If not skipped put it into outputcontents

#3. Write outputcontents to outputpath


lookIn = "source"
filequeue = []
outputpath = "source/indexcombined.ts"
outputcontents = "" #Don't touch this.

#1.Gather path names in directory indicated in look in and put the path names into filequeue if they are not there already.
#Users may manually pre-populate this list to enforce the order.
rawPath = os.walk(lookIn)

print ("Files Detected:")
for path,folders,files in rawPath:
    for file in files:
        TempPath = (path + '\\' + file)
        
        #Make sure the extension is ts
        if (file.split(".")[len(file.split("."))-1] != "ts"):
            continue
        else:
            print (file.split(".")[len(file.split("."))-1])

        #skip if it's already there
        if (TempPath in filequeue):
            continue
        print (TempPath)
        filequeue.append(TempPath)

#2. For every entry in filequeue get the file and read it line-by-line. 
for path in filequeue:
    readingFile = open(path)

    
    for ln in readingFile:

        toPut = ln
        #a. If the line starts with "export class" replace that with class.
        if "export class" in toPut.strip().lower() and toPut.strip().lower().index("export class") == 0:
            outputcontents = outputcontents + toPut.replace ("export class","class")
            continue 
        
        

        #b. If the line starts with "import {" skip it.
        if "import {" in toPut.strip().lower() and toPut.strip().lower().index("import {") == 0:
            continue


        outputcontents = outputcontents + ln 
    

    readingFile.close()



#3. Write outputcontents to outputpath
#delete it if it's there
if os.path.exists(outputpath):
    os.remove(outputpath)

writingOutput = open (outputpath,"w")
writingOutput.write(outputcontents)
writingOutput.close()
