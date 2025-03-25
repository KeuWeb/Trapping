<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Análise</title>
        <link rel="stylesheet" href="css/app.css">
    </head>
    <body>
        <div style="width: 700px;height: 500px;margin: 0 auto;">
            <div id="container-form">
                <div style="display: table;width: 100%; margin-bottom: 20px;">
                    <label for="qtdeCases">Quantidade de casos (<em>até 100 casos</em>)</label>
                    <input type="text" id="qtdeCases" name="qtdeCases" placeholder="ex.: 1" style="width: 90%;" required>
                    <input type="hidden" id="qtdeCasesHidden" name="qtdeCasesHidden" readonly>
                    <input type="hidden" id="qtdeCasesCalculate" name="qtdeCasesCalculate" value="1" readonly>
                </div>

                <div style="display: table;width: 30%;margin-right: 10px;position: relative;float: left;">
                    <label for="qtdeOccurrence">Tamanho de ocorrências (<em>na Array</em>)</label>
                    <input type="text" id="qtdeOccurrence" name="qtdeOccurrence" placeholder="ex.: 2" required disabled>
                </div>

                <div style="display: table;width: 43.5%;position: relative;float: left;">
                    <label for="qtdeCases">Valores da Array (<em>separados por espaço</em>)</label>
                    <input type="text" id="valuesArray" name="valuesArray" placeholder="ex.: 5 6 4 10 5 5 2 0" required disabled>
                </div>

                <div style="display: table;width: 15%;position: relative;float: left;">
                    <input type="button" id="btnInclude" value="INCLUIR" style="" disabled>
                </div>
        </div>
            <p style="width: 50%;margin-top: 30px;position: relative;float: left;">Aqui constará a listagem dos casos antes dos cálculos.</p>
            <input type="button" id="btnCalculate" name="btnCalculate" value="CALCULAR" style="" disabled>
            <div id="container-list-cases" style="display: table;width: 100%;">
                <div></div>
            </div>
        </div>
        <script src="js/jquery/dist/jquery.min.js"></script>
        <script src="js/app.js"></script>
    </body>
</html>