global postcode_data
#to be decided for whether tuple, list or list of dict. 

def process_address(addr):
    print("invoked process address method")
    print(addr) #process address into comma separated and then write into output file.

def init(): 
    #method to initiate the data such as postcode which is used for verification 

if __name__ == "__main__": 
    with open("files/sample_addresses.csv", "r") as file: 
        [process_address(line.rstrip()) for line in file]