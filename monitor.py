import subprocess
import time
import os

def parse_deployments_output(output):
    lines = output.splitlines()
    if len(lines) < 2:
        return "ESTATUS DEPLOYMENT:\nNo deployments found.\n\n\n"

    values = lines[1].split()

    printer = "ESTATUS DEPLOYMENT:\n"
    line1 = "ESTATUS           " + values[1] if len(values) > 1 else "N/A"
    line2 = "UPDATE            " + values[2] if len(values) > 2 else "N/A"
    line3 = "AVAILABLE         " + values[3] if len(values) > 3 else "N/A"
    line4 = "AGE               " + values[4] if len(values) > 4 else "N/A"

    printer += line1 + "\n" + line2 + "\n" + line3 + "\n" + line4

    return printer + "\n\n\n"


def get_deployments():
    result = subprocess.run(['kubectl', 'get', 'deployments', '-n', 'default'], capture_output=True, text=True)
    return result.stdout

def parse_pods_output(output):
    printer = "ESTATUS PODS:\n"

    # Dividir la salida en líneas
    lines = output.splitlines()
    if len(lines) < 2:
        return printer + "No pods found.\n\n\n"

    values = lines[1:]
    line1 = "POD     "  
    line2 = "CPU     "
    line3 = "MEM     "

    for i in range(len(values)):
        pod_values = values[i].split()
        if len(pod_values) >= 3:  # Asegurarse de que haya suficientes datos
            line1 += ("POD" + str(i+1)).ljust(7)
            line2 += pod_values[1].ljust(7)
            line3 += pod_values[2].ljust(7)

    printer += line1 + "\n" + line2 + "\n" + line3  

    return printer + "\n\n\n"

def get_pods():
    result = subprocess.run(['kubectl', 'top', 'pods', '-n', 'default'], capture_output=True, text=True)
    return result.stdout

def parse_hpa_output(output):
    lines = output.splitlines()
    if len(lines) < 2:
        return "ESTATUS HPA:\nNo HPA found.\n\n"

    columns = lines[0].split()
    values = lines[1].split()

    # Ajustar si hay más o menos valores de lo esperado
    if len(values) < len(columns):
        return "ESTATUS HPA:\nIncomplete HPA data.\n\n"

    # Manejar casos donde las columnas no coincidan
    printer = "ESTATUS HPA:\n"
    for i in range(min(len(columns), len(values))):
        printer += f"{columns[i]}: {values[i]}\n"

    return printer + "\n\n"

def get_hpa():
    result = subprocess.run(['kubectl', 'get', 'hpa', '-n', 'default'], capture_output=True, text=True)
    return result.stdout


while True:
    try:
        printer = parse_deployments_output(get_deployments())
        printer += parse_pods_output(get_pods())
        printer += parse_hpa_output(get_hpa())

        os.system('cls' if os.name == 'nt' else 'clear')  # Limpia la pantalla de la consola
        print(printer)

        time.sleep(5)  # Espera 5 segundos antes de volver a ejecutar el comando
    except Exception as e:
        print(f"Error: {e}")
        break
