import subprocess
import time
import os

def parse_deployments_output(output):
    lines = output.splitlines()
    values = lines[1].split()

    printer = "ESTATUS DEPLOYMENT:\n"
    line1 = "ETATUS            " + values[1]
    line2 = "UPDATE            " + values[2]
    line3 = "AVAILABLE         " + values[3]
    line4 = "AGE               " + values[4]

    printer += line1 + "\n" + line2 + "\n" + line3 + "\n" + line4

    return printer + "\n\n\n"


def get_deployments():
    result = subprocess.run(['kubectl', 'get', 'deployments', '-n', 'default'], capture_output=True, text=True)
    return result.stdout

def parse_pods_output(output):
    printer = "ESTATUS PODS:\n"

    # Dividir la salida en líneas
    lines = output.splitlines()
    values = lines[1:]
    line1 = "POD     "  
    line2 = "CPU     "
    line3 = "MEM     "

    for i in range(len(values)):
        values[i] = values[i].split()
        line1 += ("POD"+str(i+1)).ljust(7)
        line2 += values[i][1].ljust(7)
        line3 += values[i][2].ljust(7)

    printer += line1 + "\n" + line2 + "\n" + line3  

    return printer + "\n\n\n"

# Función para ejecutar el comando kubectl y obtener el estado de los pods
def get_pods():
    result = subprocess.run(['kubectl', 'top', 'pods', '-n', 'default'], capture_output=True, text=True)
    return result.stdout

def parse_hpa_output(output):
    # Dividir la salida en líneas
    lines = output.splitlines()
    columns = lines[0].split()
    values = lines[1].split()

    aux = values[3]
    del values[3]

    values[2] = values[2] + " " + aux

    printer = "ESTATUS HPA:\n"

    for i in range(len(columns)):
        printer += f"{columns[i]}: {values[i]}\n"
    
    return printer

# Función para ejecutar el comando kubectl y obtener el estado del HPA
def get_hpa():
    result = subprocess.run(['kubectl', 'get', 'hpa', '-n', 'default'], capture_output=True, text=True)
    return result.stdout


while True:
    printer = parse_deployments_output(get_deployments())
    printer += parse_pods_output(get_pods())
    printer += parse_hpa_output(get_hpa())

    os.system('cls')  # Limpia la pantalla de la consola (en Windows)
    
    print(printer)
    
    time.sleep(5)  # Espera 5 segundos antes de volver a ejecutar el comando