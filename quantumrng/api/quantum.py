from dotenv import dotenv_values
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit_ibm_runtime import QiskitRuntimeService
from qiskit_aer import Aer
from qiskit.transpiler.preset_passmanagers import generate_preset_pass_manager
from qiskit_ibm_runtime import SamplerV2 as Sampler
from math import log2

config = dotenv_values(".env")

class QuantumRandomNumberGenerator:
    def __init__(self):
        self.service = QiskitRuntimeService(
            channel='ibm_quantum',
            instance='ibm-q/open/main',
            token=config["API"]
        )

        self.ibm_backend = self.service.least_busy(min_num_qubits=127)
        self.classical_backend = Aer.get_backend('aer_simulator') 

    def generateClassicalRandomNumber(self, lower_bound : int, upper_bound : int, isSigned : bool) -> int:
        # Determines the number of bits required to represent the output number 
        bit_count = max(lower_bound.bit_length(), upper_bound.bit_length())

        # Setup the quantum circuit for random number generation
        quantum_register = QuantumRegister(bit_count)
        classical_register = ClassicalRegister(bit_count)

        circuit = QuantumCircuit(quantum_register, classical_register)
        circuit.h(quantum_register)
        circuit.measure(quantum_register, classical_register)

        # set up pass manager for transpilation
        pm_classical = generate_preset_pass_manager(optimization_level=3, backend=self.classical_backend)
        classical_circuit = pm_classical.run(circuit)

        # sample circuit using AerSimulator
        standard_sampler = Sampler(mode=self.classical_backend)

        pub= (classical_circuit, )
        job = standard_sampler.run([pub], shots=1)
        result = list(job.result()[0].data.values())[0].get_bitstrings()[0]
        return self.__interpretBitString(lower_bound, upper_bound, result, isSigned)
    
    def generateQuantumRandomNumber(self, lower_bound: int, upper_bound: int, isSigned: bool) -> int:
        # Determines the number of bits required to represent the output number
        bit_count = max(lower_bound.bit_length(), upper_bound.bit_length())

        # Setup the quantum circuit for random number generation
        quantum_register = QuantumRegister(bit_count)
        classical_register = ClassicalRegister(bit_count)

        circuit = QuantumCircuit(quantum_register, classical_register)
        circuit.h(quantum_register)
        circuit.measure(quantum_register, classical_register)

        # set up pass manager for transpilation
        pm_quantum = generate_preset_pass_manager(optimization_level=3, backend=self.ibm_backend)
        quantum_circuit = pm_quantum.run(circuit)

        # sample circuit using ibm_backend
        standard_sampler = Sampler(mode=self.ibm_backend)

        pub= (quantum_circuit, )
        job = standard_sampler.run([pub], shots=1)
        try:
            result = list(job.result()[0].data.values())[0].get_bitstrings()[0]
            return self.__interpretBitString(lower_bound, upper_bound, result, isSigned)
        except Exception as e:
            # TODO: this needs to be changed so that this information can relayed onto the front-end
            return -1 
        
    def __interpretBitString(self, lower_bound : int, upper_bound : int, bitString : str, isSigned : bool):
        output = int(f"0b{bitString}", 2)
        
        if (isSigned):
            bitMask = "1" * (len(bitString) - 1)
            output = output >> 1
            output = output ^ int(f"0b{bitMask}", 2)
            output += 1
            output = -1 * output

        output = output >> 1 if (output > upper_bound or output < lower_bound) else output 
        return output
