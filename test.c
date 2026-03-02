#include <stdio.h>

const char *data[] = {
#include "bookdata.h"
};

int
main(){
	int x;
	const char **p = data;
	while(*p){
		printf("[%ld] %s\n",p-data,*p);
		p++;
	}
}
