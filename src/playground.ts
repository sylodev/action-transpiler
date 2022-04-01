import dedent from "dedent";
import { writeFileSync } from "fs";
import { convert } from "./convert";

// const input = dedent\`{a!ae;--description="{perget;name}"}\`;
const input = dedent`
  {if;{args;1};

{if;{args;1};==;help;
    {a!ae;--field1name="Usage";--field1value="• \`{guild.prefix}dayweek <YYYY/MM/DD>\`\n• \`{guild.prefix}dayweek <YYYY-MM-DD>\`";--field1inline;--field2name="Examples";--field2value="• \`{guild.prefix}dayweek 1776/07/04\`\n• \`{guild.prefix}dayweek 1914-7-23\`";--field2inline;--title="Dayweek Command Help";--description="Tells you what day of the week a particular date fell on. Takes an ISO 8601 formatted date (YYYY-MM-DD) as an input and runs it through a TagScript algorithm that converts it to a day of the week.\n\nMainly built as a proof-of-concept to showcase the power of TagScript in actions. No external sources were used to determine the day of the week, just TagScript."};

{if;{find;{args;1};(\d{4})(?:\/|-)(\d{1,2})(?:\/|-)(\d{1,2})};
	{set;NumericYear;{find;{args;1};(\d{4})(?:\/|-)(\d{1,2})(?:\/|-)(\d{1,2});1}}
    {set;YearPrefix;{find;{get;NumericYear};(\d\d)(\d\d);1}}
    {set;YearSuffix;{find;{get;NumericYear};(\d\d)(\d\d);2}}
    {set;NumericMonth;{find;{args;1};(\d{4})(?:\/|-)(\d{1,2})(?:\/|-)(\d{1,2});2}}
    {set;NumericDay;{find;{args;1};(\d{4})(?:\/|-)(\d{1,2})(?:\/|-)(\d{1,2});3}}

{if;{get;NumericYear};<;1581;
	The Gregorian calendar was invented in 1581, please try again with a year between the range of: \`1582\` & \`Infinity\`;

{if;{math;{get;NumericYear} % 4};==;0;
	{if;{math;{get;NumericYear} % 100};!=;0;
        {set;LeapYear;true};
        {if;{math;{get;NumericYear} % 400};==;0;
        	{set;LeapYear;true};
            {set;LeapYear;false}}};
    {set;LeapYear;false}}

{if;{math;{get;YearPrefix} % 4};==;0;
	{set;ParsedCentury;0};
	{if;{math;{get;YearPrefix} % 4};==;1;
    	{set;ParsedCentury;5};
    	{if;{math;{get;YearPrefix} % 4};==;2;
        	{set;ParsedCentury;3};
        	{if;{math;{get;YearPrefix} % 4};==;3;
            	{set;ParsedCentury;1}}}}}

{set;ParsedYear;{get;YearSuffix}}

{if;{get;ParsedYear};>=;84;
	{set;ParsedYear;{math;{get;ParsedYear} - 84}};
	{if;{get;ParsedYear};>=;56;
		{set;ParsedYear;{math;{get;ParsedYear} - 56}};
		{if;{get;ParsedYear};>=;28;
			{set;ParsedYear;{math;{get;ParsedYear} - 28}}}}}

{if;{math;{get;ParsedYear} % 12};==;0;
    {set;ParsedYear;{math;{get;ParsedYear} / 12}}}

{if;{find;{get;ParsedYear};^(00|06|17|23)$};
	{set;ParsedYear;0};
    {if;{find;{get;ParsedYear};^(01|07|18)$};
		{set;ParsedYear;1};
		{if;{find;{get;ParsedYear};^(02|13|19|24)$};
			{set;ParsedYear;2};
			{if;{find;{get;ParsedYear};^(03|08|14|25)$};
				{set;ParsedYear;3};
				{if;{find;{get;ParsedYear};^(09|15|20|26)$};
					{set;ParsedYear;4};
					{if;{find;{get;ParsedYear};^(04|10|21|27)$};
						{set;ParsedYear;5};
						{if;{find;{get;ParsedYear};^(05|11|16|22)$};
							{set;ParsedYear;6}}}}}}}}

{if;{get;NumericMonth};>;12;
	The month you provided is greater than \`12\`. Please try again with a month between the range of: \`1\` & \`12\`;

{if;{get;NumericMonth};<;1;
	The month you provided is less than \`1\`. Please try again with a month between the range of: \`1\` & \`12\`;
	{set;NumericDay;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{get;NumericDay};^01$;1};^02$;2};^03$;3};^04$;4};^05$;5};^06$;6};^07$;7};^08$;8};^09$;9}}
	{set;NumericMonth;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{get;NumericMonth};^01$;1};^02$;2};^03$;3};^04$;4};^05$;5};^06$;6};^07$;7};^08$;8};^09$;9}}
	{set;PhoneticMonth;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{get;NumericMonth};^1$;January};^2$;February};^3$;March};^4$;April};^5$;May};^6$;June};^7$;July};^8$;August};^9$;September};^10$;October};^11$;November};^12$;December}}
	{set;ParsedMonth;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{replace;{get;NumericMonth};^2$;2};^3$;2};^5$;0};^6$;3};^1$;6};^4$;5};^7$;5};^8$;1};^9$;4};^10$;6};^11$;2};^12$;4}}

{if;{find;{get;NumericMonth};^(1|3|5|7|8|10|12)$};
	{if;{get;NumericDay};>;31;
		The day you provided is more than \`31\`. Please try again with a day between the range of: \`1\` & \`31\`;
		{if;{get;NumericDay};<;1;
			The day you provided is less than \`1\`. Please try again with a day between the range of: \`1\` & \`31\`;
			{if;{get;NumericMonth};==;1;
                {if;{get;LeapYear};==;true;
            		{set;ParsedMonth;{math;{get;ParsedMonth} - 1}}}}

{set;FinalCheck;ready}}};

{if;{find;{get;NumericMonth};^(4|6|9|11)$};
	{if;{get;NumericDay};>;30;
		The day you provided is more than \`30\`. Please try again with a day between the range of: \`1\` & \`30\`;
		{if;{get;NumericDay};<;1;
			The day you provided is less than \`1\`. Please try again with a day between the range of: \`1\` & \`30\`;

{set;FinalCheck;ready}}};

{if;{get;LeapYear};==;true;
	{if;{get;NumericDay};>;29;
    	The day you provided is more than \`29\`. Please try again with a day between the range of: \`1\` & \`29\`;
        {if;{get;NumericDay};<;1;
        	The day you provided is less than \`1\`. Please try again with a day between the range of: \`1\` & \`29\`;
            {set;ParsedMonth;{math;{get;ParsedMonth} - 1}}

{set;FinalCheck;ready}}};

    {if;{get;NumericDay};>;28;
    	The day you provided is more than \`28\`. Please try again with a day between the range of: \`1\` & \`28\`;
        {if;{get;NumericDay};<;1;
        	The day you provided is less than \`1\`. Please try again with a day between the range of: \`1\` & \`28\`;

{set;FinalCheck;ready}}}}}}}}};

{note;Incorrect argument format error message.}
This action uses the ISO 8601 date format (YYYY-MM-DD). Please try again with the correct format.}};

{note;No arguments provided error message.}
No arguments provided. Please try again using the following format: \`\`\`{guild.prefix}dayweek YYYY-MM-DD\`\`\`}

{if;{get;FinalCheck};===;ready;
	{set;NumericOutput;{math;({get;NumericDay} + {get;ParsedMonth} + {get;ParsedYear} + {get;ParsedCentury}) % 7}}
    {if;{get;NumericOutput};==;0;
    	{set;ParsedOutput;Sunday};
        {if;{get;NumericOutput};==;1;
    		{set;ParsedOutput;Monday};
        	{if;{get;NumericOutput};==;2;
    			{set;ParsedOutput;Tuesday};
        		{if;{get;NumericOutput};==;3;
    				{set;ParsedOutput;Wednesday};
        			{if;{get;NumericOutput};==;4;
    					{set;ParsedOutput;Thursday};
        				{if;{get;NumericOutput};==;5;
    						{set;ParsedOutput;Friday};
        					{if;{get;NumericOutput};==;6;
    							{set;ParsedOutput;Saturday}}}}}}}}

\`{get;PhoneticMonth} {get;NumericDay}, {get;NumericYear}\` is a \`{get;ParsedOutput}\`}
`;
const result = convert(input);
console.log({ input, result });
writeFileSync("output.txt", result.output);
