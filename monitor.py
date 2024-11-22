import subprocess
import time
import os

def parse_deployments_output(output, name_filter):
    lines = output.splitlines()
    if len(lines) < 2:
        return f"ESTATUS DEPLOYMENT ({name_filter}):\nNo deployments found.\n\n\n"

    # Filtrar líneas que contengan el identificador (por ejemplo, "backend" o "frontend")
    filtered_lines = [line for line in lines[1:] if name_filter in line]

    printer = f"ESTATUS DEPLOYMENT ({name_filter}):\n"
    for line in filtered_lines:
        values = line.split()
        if len(values) >= 5:
            printer += (
                f"NAME: {values[0]}\n"
                f"STATUS: {values[1]}\n"
                f"UP-TO-DATE: {values[2]}\n"
                f"AVAILABLE: {values[3]}\n"
                f"AGE: {values[4]}\n\n"
            )

    if not filtered_lines:
        printer += "No matching deployments found.\n"

    return printer + "\n\n"


def get_deployments():
    result = subprocess.run(['kubectl', 'get', 'deployments', '-n', 'default'], capture_output=True, text=True)
    return result.stdout

def parse_pods_output(output, name_filter):
    printer = f"ESTATUS PODS ({name_filter}):\n"

    lines = output.splitlines()
    if len(lines) < 2:
        return printer + "No pods found.\n\n\n"

    filtered_lines = [line for line in lines[1:] if name_filter in line]

    for i, line in enumerate(filtered_lines):
        pod_values = line.split()
        if len(pod_values) >= 3:
            printer += (
                f"POD{i+1}:\n"
                f"NAME: {pod_values[0]}\n"
                f"CPU: {pod_values[1]}\n"
                f"MEMORY: {pod_values[2]}\n\n"
            )

    if not filtered_lines:
        printer += "No matching pods found.\n"

    return printer + "\n\n"

def get_pods():
    result = subprocess.run(['kubectl', 'top', 'pods', '-n', 'default'], capture_output=True, text=True)
    return result.stdout

def parse_hpa_output(output, name_filter):
    lines = output.splitlines()
    if len(lines) < 2:
        return f"ESTATUS HPA ({name_filter}):\nNo HPA found.\n\n"

    filtered_lines = [line for line in lines[1:] if name_filter in line]
    if not filtered_lines:
        return f"ESTATUS HPA ({name_filter}):\nNo matching HPA found.\n\n"

    printer = f"ESTATUS HPA ({name_filter}):\n"
    for line in filtered_lines:
        values = line.split()
        if len(values) >= 5:
            printer += (
                f"NAME: {values[0]}\n"
                f"REFERENCE: {values[1]}\n"
                f"TARGETS: {values[2]} {values[3]}\n"
                f"MIN-PODS: {values[3]}\n"
                f"MAX-PODS: {values[4]}\n\n"
            )

    return printer + "\n\n"

def get_hpa():
    result = subprocess.run(['kubectl', 'get', 'hpa', '-n', 'default'], capture_output=True, text=True)
    return result.stdout


while True:
    try:
        # Despliegues, pods y HPAs para backend
        printer = parse_deployments_output(get_deployments(), "backend")
        printer += parse_pods_output(get_pods(), "backend")
        printer += parse_hpa_output(get_hpa(), "backend")

        # Despliegues, pods y HPAs para frontend
        printer += parse_deployments_output(get_deployments(), "frontend")
        printer += parse_pods_output(get_pods(), "frontend")
        printer += parse_hpa_output(get_hpa(), "frontend")

        os.system('cls' if os.name == 'nt' else 'clear')  # Limpia la pantalla de la consola
        print(printer)

        time.sleep(5)  # Espera 5 segundos antes de volver a ejecutar el comando
    except Exception as e:
        print(f"Error: {e}")
        break
