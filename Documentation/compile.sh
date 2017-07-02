#!/bin/bash

cd /source
markdown-pp main.mdpp -o main.md
pandoc -t latex main.md --template=./latex/main.tex -H ./latex/preamble.tex --biblatex --biblio=output.bib -s --parse-raw -o output.tex
pdflatex output
biber output
pdflatex output
pdflatex output

rm main.md output.aux output.bcf output.lof output.log output.lot output.out output.toc output.run.xml output.bbl output.blg
