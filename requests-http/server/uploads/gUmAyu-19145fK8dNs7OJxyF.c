#include <stdio.h>

void clear_input_buffer() {
    // limpa o buffer de entrada do teclado
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

void write_number_to_file(char* filename, double number) {
    FILE* file = fopen(filename, "a"); // abre o arquivo para escrita no final
    if (file == NULL) {
        printf("Erro ao abrir o arquivo %s.\n", filename);
        return;
    }

    // escreve o número por extenso no arquivo
    int integer_part = (int) number;
    int fractional_part = (int) ((number - integer_part) * 100);
    fprintf(file, "%d reais e %d centavos\n", integer_part, fractional_part);

    fclose(file); // fecha o arquivo
    printf("Número salvo em %s.\n", filename);
}

void print_numbers_from_file(char* filename) {
    FILE* file = fopen(filename, "r"); // abre o arquivo para leitura
    if (file == NULL) {
        printf("Erro ao abrir o arquivo %s.\n", filename);
        return;
    }

    char line[100];
    while (fgets(line, sizeof(line), file) != NULL) {
        // imprime cada linha do arquivo
        printf("%s", line);
    }

    fclose(file); // fecha o arquivo
}

void write_number() {
    double number;
    printf("Digite um número entre 0 e 9999.99: ");
    while (scanf("%lf", &number) != 1 || number < 0 || number > 9999.99) {
        clear_input_buffer(); // limpa o buffer de entrada do teclado
        printf("Número inválido. Digite um número entre 0 e 9999.99: ");
    }
    clear_input_buffer(); // limpa o buffer de entrada do teclado

    write_number_to_file("numeros.txt", number);
}

void print_numbers() {
    print_numbers_from_file("numeros.txt");
}

int main() {
    int opcao;
    do {
        printf("Menu:\n");
        printf("1- Escrever um número por extenso\n");
        printf("2- Imprimir todos os números do arquivo em tela\n");
        printf("3- Sair\n");
        printf("Escolha uma opção: ");
        while (scanf("%d", &opcao) != 1) {
            clear_input_buffer(); // limpa o buffer de entrada do teclado
            printf("Opção inválida. Escolha uma opção: ");
        }
        clear_input_buffer(); // limpa o buffer de entrada do teclado

        switch (opcao) {
            case 1:
                write_number();
                break;
            case 2:
                print_numbers();
                break;
            case 3:
                printf("Saindo...\n");
                break;
            default:
                printf("Opção inválida.\n");
                break;
        }
    } while (opcao != 3);

    return 0;
}
