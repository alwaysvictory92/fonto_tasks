import string 

global postcode_data
global street_types

"""
data structure 

{
    state_code: [
        (postcode, suburb)
    ]
}
"""
#to be decided for whether tuple, list or list of dict.

def process_address(addr):
    no_postcode = False
   # print("invoked process address method")
    #print(addr) #process address into comma separated and then write into output file.
    addr1 = addr.split(" ")
    postcode = addr1.pop()
    if postcode.isdigit(): #assuming that postcode is not provided then last pop is the state. 
        state_acronym = addr1.pop()
    else:
        state_acronym = postcode
        no_postcode = True

    

    suburb = addr1.pop()
    while addr1[len(addr1) - 1].lower() not in street_types:
        print(addr1)
        suburb = addr1.pop() + " " + suburb

    street = ' '.join(addr1)
    print(postcode + " | " + state_acronym + " | " + suburb +  " | " + street + " | " )
    
    with open("files/output.csv", "a+") as file:
        file.write("{},{},{},{}\n".format(street,suburb,state_acronym,postcode))





def init(): 
    #method to initiate the data such as postcode which is used for verification 
    global postcode_data, street_types
    postcode_data = dict()
    street_types = []
    with open("files/australian_post_codes.txt", "r") as file: 
        file.readline()
        for line in file: 
            data = line.split(",")
            #print(data[0] + " " + data[1] + " " + data[3])
            if data[3] in postcode_data:
                postcode_data[data[3]].append( ( (int(data[0])) , data[1] , data[3]) )
            else:
                #print("enter here")
                postcode_data[data[3]] = list(( (int(data[0])) , data[1] , data[3]))

    with open("files/streets.csv", "r") as file: 
        [street_types.extend((line).lower().strip().split(",")) for line in file]
        
    
    print (street_types)
    return 0

if __name__ == "__main__": 
    global postcode_data
    init()
    with open("files/sample_addresses.csv", "r") as file: 
        [process_address(line.translate(str.maketrans('','',"\n\"\',"))) for line in file]

    #print(postcode_data['NT'])