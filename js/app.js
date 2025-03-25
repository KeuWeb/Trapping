$(document).ready(function() {
    function disableFields() {
        $("#qtdeOccurrence, #valuesArray, #btnInclude").prop('disabled', true);
    }
    
    function enableFields() {
        $("#qtdeOccurrence, #valuesArray, #btnInclude").prop('disabled', false);
    }
    
    $(document).on('keyup', '#qtdeCases', function(){
        let value = $(this).val();

        if (value === "") {
            disableFields();
        } else {
            if (!/^\d+$/.test(value)) {
                alert('Somente números.');
                $(this).val('');
                disableFields();
            } else if (value > 100) {
                alert('Limite de até 100 casos.');
                $(this).val('');
                disableFields();
            } else if (value > 0){
                enableFields();

                $("#qtdeCasesHidden").val(value);
            } else {
                disableFields();
            }
        }
    });

    $(document).on('keyup', '#qtdeOccurrence, #valuesArray', function(){
        let value = $(this).val();

        if (value != "") {
            if (!/^[\d ]+$/.test(value)) {
                alert('Somente números.');
                $(this).val('');
            }
        }
    });

    $(document).on('click', '#btnInclude', function(){
        let qtdeOccurrence = $('#qtdeOccurrence').val();
        let valuesArray = $('#valuesArray').val().trim().split(/\s+/);
        let qtdeCases = $('#qtdeCasesHidden').val();
        let casesCalulate = $('#qtdeCasesCalculate').val();

        if (qtdeOccurrence != valuesArray.length){
            alert('Quantidade de valores não corresponde ao tamanho definido de ocorrências.');
            console.log(qtdeOccurrence + ' - ' + valuesArray.length);
            return;
        } else if (qtdeCases == 0) {
            alert('Ops! Quantidade de casos chegou ao limite.');
            return;
        } else {
            let cases = $('#container-list-cases').find('div');
            let newCase = '<div style="padding: 0 10px;display: table;width: 90%;border: 1px solid gray;margin-bottom: 5px;">';
            newCase += '<p style="width: 20%;position: relative;float: left;"><b>Ocorrências</b><br>' + qtdeOccurrence + '</p>';
            newCase += '<p style="width: 60%;position: relative;float: left;"><b>Valores</b><br>' + valuesArray.join(' ') + '</p>';
            newCase += '<p id="result' + casesCalulate + '" style="width: 20%;position: relative;float: left;"></p>';   
            newCase += '<input type="hidden" id="case' + casesCalulate + '" name="case' + casesCalulate + '" value="' + qtdeOccurrence + '">';
            newCase += '<input type="hidden" id="valor' + casesCalulate + '" name="valor' + casesCalulate + '" value="' + valuesArray.join(' ') + '">';
            newCase += '</div>';

            cases.first().before(newCase);

            $('#qtdeOccurrence').val('');
            $('#valuesArray').val('');
            $('#qtdeCasesHidden').val(--qtdeCases);
            $('#qtdeCasesCalculate').val(++casesCalulate);

            let newQtdeCasesHidden = $('#qtdeCasesHidden').val();

            if(newQtdeCasesHidden == 0) {
                $('#btnCalculate').prop('disabled',false);
            } else {
                $('#btnCalculate').prop('disabled',true);
            }
        }
    });

    $(document).on('click', '#btnCalculate', function() {
        let data = [];

        $('#container-list-cases div').each(function() {
            let caseInput = $(this).find('input[name^="case"]');
            let valorInput = $(this).find('input[name^="valor"]');

            let caseValue = caseInput.val();
            let valueArray = valorInput.val();

            if (caseValue && valueArray) {
                valueArray = valueArray.split(' ');

                data.push({
                    case: caseValue,
                    values: valueArray
                });
            }
        });

        if (data.length > 0) {
            $.ajax({
                url: 'calculate.php',
                type: 'POST',
                data: { dados: data },
                dataType: 'json',
                success: function(response) {
                    let water = response.water;
                    let arrWater = response.water.split(',');
                    let qtdeCases = $('#casesCalulate').val();
                    
                    arrWater.forEach((valor, index) => {
                        let item = index + 1;
                        $('#result' + item).html("<b style='color: green'>Resultado<br>" + valor + "</b>");
                    });

                    alert('Calculo feito com sucesso!');
                },
                error: function(xhr, status, error) {
                    console.log('Erro ao enviar os dados:', error);
                }
            });
        } else {
            console.log('Nenhum dado válido para enviar.');
        }
    });
});