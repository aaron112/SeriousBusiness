#!/usr/bin/perl

use Getopt::Long;

my $sid = "an";
my $day = "2/19/2014";
my $start_hour = 6;
my $end_hour = 11;
my $min_interval = 15;

$result = GetOptions ("sid=s" => \$sid,
                    "day=s"   => \$day,
                    "starthour=i" => \$start_hour,
                    "endhour=i" => \$end_hour,
                    "mininterval=i" => \$min_interval)
or die("Error in command line arguments\n");

print "starting\n";

for ( my $i = $start_hour; $i < $end_hour; $i++ ) {

    for ( my $j = 0; $j < 60; $j += $min_interval ) {
        print "        {\"sid\": \"".$sid.
        "\", \"date\": \"".$day.
        " ".$i.":".$j.
        ":00 PST\", \"seatsleft\": ".int(rand(30)).
        ", \"walkin\": ".(int(rand(2))==0?30:20)."},\n";
    }
}
