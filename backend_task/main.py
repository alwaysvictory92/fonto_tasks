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

def get_suburb(state,postcode): #get list of suburbs from state and postcode
    items = []
    [items.append(tup) for tup in postcode_data[state] if postcode in tup[0]]
    return items
#END OF FIND SUBURB FUNCTION

def find_state(postcode): #get state from postcode
    for states in postcode_data:
        for tup in postcode_data[states]:
            if postcode in tup[0]:
                return states
# END OF FIND STATE FUNCTION 

def find_postcode(state, suburb):
    for states in postcode_data:
        for tup in postcode_data[states]:
            if suburb in tup[1].lower():
                return tup[0]
#END OF FIND POSTCODE FUNCTION        
            

def process_address(addr):
    addr1 = addr.split(" ")
    postcode = addr1.pop()
    
    if postcode.isdigit(): #assuming that postcode is not provided then last pop is the state. 
        state_acronym = addr1.pop()
        if state_acronym not in postcode_data:
            addr1.append(state_acronym) 
            state_acronym = find_state(postcode)
    else:
        state_acronym = postcode
        postcode = ""

#loop must run from left side because suburb names may contain street type names 
#which is used for identifying the street name
    i = 0
    suburb = "" #if empty meaning suburb not found
    for i in range(len(addr1)):
        if addr1[i].lower() in street_types:
            suburb = ' '.join(addr1[i+1:])
            del addr1[i+1:]
            break

    if postcode == "": 
        #postcode from the address is missing, since we know the suburb and state we can find postcode
        postcode = find_postcode(state_acronym, suburb.lower())

    street = ' '.join(addr1)
    
    try:
        get_suburb(state_acronym, str(postcode)) #checks the suburb provided state and postcode.

        #opening file for each address to demonstrate address adding per customer on the server.
        with open("files/output.csv", "a+") as file:
            file.write("{},{},{},{}\n".format(street,suburb,state_acronym,postcode))
    except:
        print("ERROR: Address is not valid or not Australian: " + addr)
# END OF PROCESS ADDRESS FUNCTION     

def init(): 
    #method to initiate the data such as postcode which is used for verification 
    global postcode_data, street_types
    postcode_data = dict()
    street_types = []
    with open("files/australian_post_codes.txt", "r") as file: 
        file.readline()
        for line in file: 
            data = line.split(",")
            if data[3] in postcode_data:
                postcode_data[data[3]].append( ( ((data[0])) , data[1] , data[3]) )
            else:
                postcode_data[data[3]] = list(( ((data[0])) , data[1] , data[3]))

    with open("files/streets.csv", "r") as file: 
        [street_types.extend((line).lower().strip().split(",")) for line in file]
# END OF INIT FUNCTION

if __name__ == "__main__": 
    init()
    
    open("files/output.csv", "w").close() 
    #creates a new file if does not exist or truncat old data from file.
    
    with open("files/sample_addresses.csv", "r") as file: 
        [process_address(line.translate(str.maketrans('','',"\n\"\',"))) for line in file]